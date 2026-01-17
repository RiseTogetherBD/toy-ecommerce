import { Request, Response } from "express";
import { categoryService } from "./categoryServices";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";



const createCategory = catchAsync( async (req: Request, res: Response) =>{
 
     
    const result = await categoryService.createCategory(req.body);
   
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Category create successfully",
      data: result
    })

  })
   


  const gelALLCategory = (async (req: Request, res: Response) =>{
   
      const result = await categoryService.getAllCategories();
      console.log(result)
     sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Category fetched successfully",
      data: result
     })
    
  })

 const getSingleCategoryById = ( async (req: Request, res: Response)=> {
  
      const result = await categoryService.getSingleCategory(req.params.id as string);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success:true,
        message: "Category fetched successfully",
        data:result
      })
      
  })

  const updateCategory=(async(req: Request, res: Response) =>{

      const result = await categoryService.updateCategory(req.params.id as string, req.body);
        sendResponse(res, {
        statusCode: httpStatus.OK,
        success:true,
        message: "Category update successfully",
        data: result
      })
   
  })

  const deleteCategory =  (async (req: Request, res: Response)=> {
   
      const result = await categoryService.deleteCategory(req.params.id as string);
      sendResponse(res,{
        statusCode: httpStatus.OK,
         success: true, 
         message: "Category deleted successfully" ,
         data: result

        });
   
  })
  export const categoryController = {
    createCategory,
    gelALLCategory,
    getSingleCategoryById ,
    updateCategory,
    deleteCategory
};
