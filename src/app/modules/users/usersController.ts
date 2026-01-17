import { Request, Response } from "express";
import { usersService } from "./usersServices";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";


const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  if (!payload.email || !payload.password || !payload.name) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Missing required fields",
    });
  }

  const result  = await usersService.createUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result ,
  });
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result  = await usersService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: result ,
  });
});


const getUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await usersService.getUserById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result ,
  });
});


const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result  = await usersService.upDateUser(id as string, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result ,
  });
});


const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await usersService.deleteUser(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const usersController = {
  register,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
