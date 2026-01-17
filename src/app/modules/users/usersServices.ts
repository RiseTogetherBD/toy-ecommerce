import httpStatus from "http-status";
import ApiError from "../../../utils/ApiError";
import { prisma } from "../../lib/prisma";
import { User } from "@prisma/client";

const createUser = async (payload: any): Promise<User> => {
  const { email, password, name } = payload;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const user = await prisma.user.create({
    data: { email, password, name },
  });

  return user;
};

const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

const getUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const upDateUser = async (id: string, payload: any): Promise<User> => {
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return updatedUser;
};

const deleteUser = async (id: string): Promise<User> => {
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const deletedUser = await prisma.user.delete({ where: { id } });
  return deletedUser;
};

export const usersService = {
  createUser,
  getAllUsers,
  getUserById,
  upDateUser,
  deleteUser,
};
