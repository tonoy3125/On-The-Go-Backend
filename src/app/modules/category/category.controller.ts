import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

import sendResponse from '../../utils/sendResponse'
import { CategoryServices } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryInDB(req.body)
  //   send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Created Successfully',
    data: result,
  })
})

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategoryFromDB(req?.query)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Retrieved successfully!',
    meta: result.meta,
    data: result.result,
  })
})

const getAllCategoryByName = catchAsync(async (req, res) => {
  const name = req.params.name
  const result = await CategoryServices.getCategoryNameFromDB(name)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Retrieved By Name Successfully!',
    data: result,
  })
})

export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getAllCategoryByName,
}
