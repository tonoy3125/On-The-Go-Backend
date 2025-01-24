import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB(req?.query)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved successfully!',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.getSingleUserFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved successfully!',
    data: result,
  })
})

export const UserControllers = {
  getAllUser,
  getSingleUser,
}
