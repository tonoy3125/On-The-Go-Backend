import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import { User } from './user.model'
import { AppError } from '../../errors/AppError'
import { JwtPayload } from 'jsonwebtoken'
import { Post } from '../post/post.model'
import { TPaymentPayload } from '../payment/payment.interface'
import { initiatePayment } from '../payment/payment.utils'

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

const isCapableForPremium = catchAsync(async (req, res) => {
  const user = req.user!._id
  // console.log('is Capable For Premium', user)

  const post = await Post.findOne({ user: user, reactionCount: { $gt: 0 } })
  // console.log(post)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'successfully check user capability for premium',
    data: post ? true : false,
  })
})

const generateVerifyAccountPaymentUrl = catchAsync(async (req, res) => {
  const user = await User.findById(req.user!._id)
  // console.log('Generate User', user)
  if (!user) {
    return sendResponse(res, {
      message: 'User not found',
      success: false,
      data: null,
      statusCode: 404,
    })
  }
  const post = await Post.findOne({
    user: user?._id,
    reactionCount: { $gt: 0 },
  })
  if (!post) {
    return sendResponse(res, {
      message: 'Not capled for premium',
      success: false,
      data: null,
      statusCode: 404,
    })
  }

  const payload: TPaymentPayload = {
    amount: 200,
    cus_add: 'N/A',
    cus_name: user.name,
    cus_phone: user?.phone,
    cus_email: user.email,
    tran_id: String(Date.now()),
  }

  const result = await initiatePayment(payload, user._id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment initiated Successfully!',
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

export const updateUserProfileImage = catchAsync(async (req, res) => {
  const file = req.file
  const user = req.user as JwtPayload
  if (!file) {
    return sendResponse(res, {
      message: 'file not found',
      success: false,
      data: null,
      statusCode: 404,
    })
  }
  const url = file.path as string
  if (!url) {
    return sendResponse(res, {
      message: 'failed to upload image',
      success: false,
      data: null,
      statusCode: 400,
    })
  }

  const isExistUser = await User.findOne({ email: user.email })
  if (!isExistUser) {
    return sendResponse(res, {
      message: 'user not found',
      success: false,
      data: null,
      statusCode: 404,
    })
  }
  const result = await User.findByIdAndUpdate(
    isExistUser._id,
    { image: url },
    { new: true, runValidators: true },
  )

  sendResponse(res, {
    data: result,
    message: 'Image Updated Successfully',
    statusCode: 200,
    success: true,
  })
})

export const UserControllers = {
  getAllUser,
  getSingleUser,
  getUserProfile,
  updateUserRole,
  isCapableForPremium,
  generateVerifyAccountPaymentUrl,
  updateUser,
}
