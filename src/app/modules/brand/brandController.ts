import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { brandService } from "./brandServices";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";






const createBrand = catchAsync(
  async (req: Request, res: Response) => {
    const result = await brandService.createBrand(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Brand created successfully",
      data: result,
    });
  }

);



const getAllBrand = catchAsync(
  async (req: Request, res: Response) => {
    const result = await brandService.getAllBrand();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Brands fetched successfully",
      data: result,
    });
  }
);

const getSingleBrandById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await brandService.getSingleBrandById(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Brand fetched successfully",
      data: result,
    });
  }
);

const updatedBrand = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await brandService.updateBrand(id  as string, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Brand updated successfully",
      data: result,
    });
  }
);

const deletedBrand = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await brandService.deleteBrand(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Brand deleted successfully",
      data: null,
    });
  }
);

export const brandController = {
 createBrand,
  getAllBrand,
 getSingleBrandById,
 updatedBrand,
  deletedBrand,
};


