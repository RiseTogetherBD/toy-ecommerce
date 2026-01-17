import { Prisma } from "@prisma/client";
import { IGetProductsQuery, IPaginatedResult } from "../../types/product";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { prisma } from "../../lib/prisma";
import { generateSlug } from "../../helpers/slugGenerator";
import ApiError from "../../../utils/ApiError";
import  httpStatus  from "http-status";



const createProduct = async (payload: any) => {
  const { variants, images, brandId, categoryId, ...productData } = payload;

  // 1 Validate Brand
  const brandExists = await prisma.brand.findUnique({
    where: { id: brandId },
  });

 if (!brandExists) {
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    "Invalid brandId: Brand not found"
  );
}
  // 2 Validate Category
  const categoryExists = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!categoryExists) {
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    "Invalid categoryId: Category not found"
  );
}

  // 3 Generate slug
  const slug = `${generateSlug(productData.name)}-${Math.floor(
    Math.random() * 10000
  )}`;

  // 4 Create product
  return await prisma.product.create({
    data: {
      ...productData,
      slug,
      brand: {
        connect: { id: brandId },
      },
      category: {
        connect: { id: categoryId },
      },
     variants: {
        create: variants.map((v: any) => {
          const color = v.color?? null;
          const size = v.size ?? null;
          const basePrice = Number(v.basePrice);
          const sellPrice = Number(v.sellPrice)
          const discount = Number(v.discount || 0); // %
          // const finalSellPrice = Number(sellPrice - (sellPrice * discount) / 100)
          const stockQuantity = Number(v.stockQuantity || 0);
          return {
            sku: v.sku,
            variantName: v.variantName,
            color,
            size,
            basePrice,
            discount,
            sellPrice,
            // finalSellPrice,
            
            inventory: v.stockQuantity
              ? { create: 
                { 
                 stockQuantity,
                 SoldQuantity: 0,
                 soldRevenue: 0,
                 totalPriced: basePrice * stockQuantity,
                  }
             }
              : undefined,
          };
        }),
      },
      images: images?.length
        ? {
            create: images.map((img: any) => ({
              imageUrl: img.imageUrl,
              isPrimary: img.isPrimary ?? false,
            })),
          }
        : undefined,
    },
    include: {
      variants: { include: { inventory: true } },
      images: true,
      brand: true,
      category: true,
    },
  });
};


const getAllProducts = async (
  query: IGetProductsQuery
): Promise<IPaginatedResult<any>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationSortingHelper(query);

  const where: Prisma.ProductWhereInput = {};

  // Search
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
      { brand: { name: { contains: query.search, mode: "insensitive" } } },
      { category: { name: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  // Status
  if (query.status) where.status = query.status;

  // Type filter (category.type)
  if (query.type) {
    where.category = { is: { type: query.type } };
  }

  // Price range (based on variant sellPrice)
if (query.minPrice !== undefined || query.maxPrice !== undefined) {
  where.variants = {
    some: {
      ...(query.minPrice !== undefined && {
        sellPrice: { gte: query.minPrice },
      }),
      ...(query.maxPrice !== undefined && {
        sellPrice: { lte: query.maxPrice },
      }),
    },
  };
}


  // Age range
  if (query.ageMin !== undefined || query.ageMax !== undefined) {
    where.AND = [
      ...(Array.isArray(where.AND) ? where.AND : []),
      ...(query.ageMin !== undefined ? [{ ageMin: { gte: query.ageMin } }] : []),
      ...(query.ageMax !== undefined ? [{ ageMax: { lte: query.ageMax } }] : []),
    ];
  }

  // Featured
  if (query.isFeatured !== undefined) {
    where.AND = [
      ...(Array.isArray(where.AND) ? where.AND : []),
      { isFeatured: query.isFeatured },
    ];
  }

 

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: {
        variants: { include: { inventory: true } },
        images: true,
        brand: true,
        category: true,
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);
  // ADD finalSellPrice in RESPONSE
  const formattedProducts = products.map(product => ({
    ...product,
    variants: product.variants.map(variant => ({
      ...variant,
      finalSellPrice:
        variant.sellPrice -
        (variant.sellPrice * (variant.discount ?? 0)) / 100,
    })),
  }));

  const totalPages = Math.ceil(total / limit);

  return {
    data: formattedProducts,
    pagination: { total, page, limit, totalPages },
  };
};




const getProductById = async (id: string) => {
const product = await prisma.product.findUnique({
  where: { id },
  include: { 
    variants: { include: { inventory: true } },
    brand: true,
    category: true,
    images: true
  }
});

if (!product) {
  throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
}
// Now variants is actually an array
const formattedProduct = {
  ...product,
  variants: product.variants.map((v) => ({
    ...v,
    finalSellPrice: v.sellPrice - (v.sellPrice * (v.discount ?? 0)) / 100,
  })),
};

return formattedProduct;


};



 const updateProduct = async (id: string, payload: any) => {
  const { variants, images, brandId, categoryId, ...productData } = payload;

  return await prisma.$transaction(async (tx) => {
    // 1. Validate Product
    const productExists = await tx.product.findUnique({ where: { id } });
    if (!productExists) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    // 2. Validate Brand & Category if provided
    if (brandId) {
      const brandExists = await tx.brand.findUnique({ where: { id: brandId } });
      if (!brandExists) throw new ApiError(httpStatus.BAD_REQUEST, "Brand not found");
    }

    if (categoryId) {
      const categoryExists = await tx.category.findUnique({ where: { id: categoryId } });
      if (!categoryExists) throw new ApiError(httpStatus.BAD_REQUEST, "Category not found");
    }

    // 3. Update Product basic info
    await tx.product.update({
      where: { id },
      data: {
        ...productData,
        ...(brandId ? { brand: { connect: { id: brandId } } } : {}),
        ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
      },
    });

    // 4. Handle Variants + Inventory
    if (variants?.length) {
      for (const v of variants) {
        let variantId = v.id;

        const variantData = {
          sku: v.sku,
          variantName: v.variantName,
          basePrice: v.basePrice,
          sellPrice: v.sellPrice,
          discount: v.discount,
          color: v.color ?? null,
          size: v.size ?? null,
        };

        // Update or create variant
        if (variantId) {
          await tx.productVariant.update({
            where: { id: variantId },
            data: variantData,
          });
        } else {
          const newVariant = await tx.productVariant.create({
            data: { ...variantData, productId: id },
          });
          variantId = newVariant.id;
        }

        // Inventory handling
        if (v.stockQuantity !== undefined) {
          const inventoryExists = await tx.inventory.findUnique({ where: { variantId } });
          const totalPriced = (v.basePrice || 0) * (v.stockQuantity || 0);

          if (inventoryExists) {
            await tx.inventory.update({
              where: { variantId },
              data: {
                stockQuantity: v.stockQuantity,
                SoldQuantity: v.soldQuantity ?? inventoryExists.SoldQuantity,
                soldRevenue: v.soldRevenue ?? inventoryExists.soldRevenue,
                totalPriced,
              },
            });
          } else {
            await tx.inventory.create({
              data: {
                variantId,
                stockQuantity: v.stockQuantity,
                SoldQuantity: v.soldQuantity ?? 0,
                soldRevenue: v.soldRevenue ?? 0,
                totalPriced,
              },
            });
          }
        }
      }
    }

    // 5. Handle Images
    if (images?.length) {
      for (const img of images) {
        const imageExists = img.id
          ? await tx.productImage.findUnique({ where: { id: img.id } })
          : null;

        if (imageExists) {
          await tx.productImage.update({
            where: { id: img.id },
            data: { imageUrl: img.imageUrl, isPrimary: img.isPrimary },
          });
        } else {
          await tx.productImage.create({
            data: { productId: id, imageUrl: img.imageUrl, isPrimary: img.isPrimary },
          });
        }
      }
    }

    // 6. Return updated product with relations + finalSellPrice
    const result = await tx.product.findUnique({
      where: { id },
      include: {
        variants: { include: { inventory: true } },
        images: true,
        brand: true,
        category: true,
      },
    });

    // 7. Calculate finalSellPrice dynamically for frontend
    if (result?.variants?.length) {
      result.variants = result.variants.map((v) => ({
        ...v,
        finalSellPrice: v.sellPrice - ((v.sellPrice * (v.discount ?? 0)) / 100),
      }));
    }

    return result;
  });
};




const deleteProduct = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    const variants = await tx.productVariant.findMany({
      where: { productId: id },
      select: { id: true },
    });

    const variantIds = variants.map(v => v.id);

    await tx.inventory.deleteMany({
      where: { variantId: { in: variantIds } },
    });

    await tx.productVariant.deleteMany({
      where: { productId: id },
    });

    await tx.productImage.deleteMany({
      where: { productId: id },
    });

    return tx.product.delete({
      where: { id },
    });
  });
};


export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
