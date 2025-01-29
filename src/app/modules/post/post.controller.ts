import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { PostServices } from './post.service'
import { TPost } from './post.interface'
import { JwtPayload } from 'jsonwebtoken'
import { TUser } from '../user/user.interface'

export const uploadPostImage = catchAsync(async (req, res) => {
  const file = req.file
  if (!file) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: 'file not found',
      data: null,
    })
  }
  const url = file.path as string
  if (!url) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: 'failed to upload image',
      data: null,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Image Uploaded Successfully',
    data: url,
  })
})

const CreatePost = catchAsync(async (req, res) => {
  const { content, categories, images, premium, group } = req.body
  const userId = req.user!._id
  console.log('premium is', req?.user?.isPremium)

  if (premium && !req?.user?.isPremium) {
    sendResponse(res, {
      success: false,
      data: null,
      message: 'you need to subscribe to premium',
      statusCode: 400,
    })
    return
  }

  const payload = {
    content,
    images,
    categories,
    premium: Boolean(premium),
    user: userId as string,
    group,
  } as TPost

  const result = await PostServices.createPostIntoDB(payload)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Created Successfully',
    data: result,
  })
})

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const user = req.user as JwtPayload
  console.log(user)
  const result = await PostServices.deletePostFromDB(id, user as TUser)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Deleted Successfully!',
    data: result,
  })
})

export const PostControllers = {
  CreatePost,
  uploadPostImage,
  deletePost,
}
