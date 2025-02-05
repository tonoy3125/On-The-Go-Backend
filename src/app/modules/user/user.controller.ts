import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import { User } from './user.model'
import { AppError } from '../../errors/AppError'

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

const getUserProfile = catchAsync(async (req, res) => {
  const requesterId = req.user!._id // Assuming authenticated user info is in req.user
  const { userId } = req.params
  const result = await UserServices.getUserProfileDataFromDB(
    userId,
    requesterId,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully!',
    data: result,
  })
})

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params
  const { role: newRole } = req.body
  const result = await UserServices.updateUserRoleInDB(id, newRole)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Role Updated Successfully!',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body // All updated fields should be passed in the request body

  // Fetch the user by ID to determine their role
  const user = await User.findById(id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this ID')
  }

  const result = await UserServices.updateUserIntoDB(id, payload)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Profile Updated Successfully!',
    data: result,
  })
})

export const UserControllers = {
  getAllUser,
  getSingleUser,
  getUserProfile,
  updateUserRole,
  updateUser,
}
