import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { generateSlug } from "../../helpers/slugGenerator";
import ApiError from "../../../utils/ApiError";


const createCategory = async (payload: any) => {
  if (!payload.name || !payload.type) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "name and type are required"
    );
  }

  if (payload.parentId && payload.parentId === payload.id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Category cannot be parent of itself"
    );
  }

  const slug = `${generateSlug(payload.name)}-${Math.floor(
    Math.random() * 10000
  )}`;

  return prisma.category.create({
    data: {
      name: payload.name,
      slug,
      type: payload.type,
      parentId: payload.parentId ?? null, // root হলে null
      isActive: payload.isActive ?? true,
    },
  });
};


const getAllCategories = async () => {
  return prisma.category.findMany({
    where: {
      isActive: true,
      parentId: null, // ONLY ROOT
    },
    include: {
      children: {
        where: { isActive: true },
      },
    },
  });
};


const getSingleCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      children: true,
      products: true,
    },
  });

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  return category;
};

const updateCategory = async (id: string, payload: any) => {
  // existence check
  await getSingleCategory(id);

  return prisma.category.update({
    where: { id },
    data: payload,
    include: {
      children: true,
      products: true,
    },
  });
};

const deleteCategory = async (id: string) => {
  // soft delete
  await getSingleCategory(id);

  return prisma.category.update({
    where: { id },
    data: { isActive: false },
  });
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
