import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { PostServices } from './post.service'
import { TPost } from './post.interface'

export const uploadPostImage = catchAsync(async (req, res) => {
  console.log('Received File:', req.file)
  const file = req.file
  if (!file) {
    return sendResponse(res, {
      message: 'file not found',
      success: false,
      data: null,
      statusCode: 404,
    })
  }
  console.log('Uploaded File Path:', file.path)
  const url = file.path as string
  if (!url) {
    return sendResponse(res, {
      message: 'failed to upload image',
      success: false,
      data: null,
      statusCode: 400,
    })
  }

  sendResponse(res, {
    message: 'Image Uploaded Successfully',
    success: true,
    data: url,
    statusCode: 200,
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

export const PostControllers = {
  CreatePost,
  uploadPostImage,
}
