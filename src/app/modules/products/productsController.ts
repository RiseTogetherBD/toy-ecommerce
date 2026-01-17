import { Request, Response } from "express";
import { productService } from "./productsServices";
import { buildProductQuery } from "../../helpers/querybuilder";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";


  const createProduct = catchAsync(async (req: Request, res: Response) => {
  
      const result = await productService.createProduct(req.body);
     
      sendResponse(res,{
          statusCode:httpStatus.CREATED,
          message: " Product crated successfully",
          success: true, 
          data: result 
        });
    
  })

const getAllProducts = catchAsync (async (req: Request, res: Response) => {



    const result = await productService.getAllProducts(
      buildProductQuery(req.query)
    );

    //  IMPORTANT PART
    if (result.pagination.total === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
        data: [],
        pagination: result.pagination,
      });
    }

   sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: " Category fetched successfully",
    data: result
   })
})


  const getProductById = catchAsync(async (req: Request, res: Response) => {
 
      
      const result = await productService.getProductById(req.params.id as string);
      sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: " Category fetched successfully",
          data: result
         });
    
  })

  const updateProduct = catchAsync(async (req: Request, res: Response) => {
   
      const result = await productService.updateProduct(req.params.id as string, req.body);
      sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: " Category fetched successfully",
          data: result
         });
    }  )

  const deleteProduct = catchAsync (async (req: Request, res: Response) => {

    const result = await productService.deleteProduct(req.params.id as string) ;
     sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: " Category deleted successfully",
          data: result
         });
  })
  export const productsController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct ,
    deleteProduct
};
