import httpStatus from "http-status";
import { generateSlug } from "../../helpers/slugGenerator";
import { prisma } from "../../lib/prisma";
import ApiError from "../../../utils/ApiError";


const createBrand = async (data: any) => {
  const slug = `${generateSlug(data.name)}-${Math.floor(Math.random() * 10000)}`;

  const brand = await prisma.brand.create({
    data: {
      name: data.name,
      slug,
      country: data.country ?? null,
      isActive: data.isActive ?? true,
    },
  });

  return brand;
};

const getAllBrand = async () => {
  return prisma.brand.findMany();
};

const getSingleBrandById = async (id: string) => {
  const brand = await prisma.brand.findUnique({
    where: { id },
  });

  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
  }

  return brand;
};

const updateBrand = async (id: string, data: any) => {
  // exists check
  await getSingleBrandById(id);

  return prisma.brand.update({
    where: { id },
    data,
  });
};

const deleteBrand = async (id: string) => {
  // exists check
  await getSingleBrandById(id);

  await prisma.brand.delete({
    where: { id },
  });

  return null;
};

export const brandService = {
  createBrand,
  getAllBrand,
  getSingleBrandById,
  updateBrand,
  deleteBrand,
};
