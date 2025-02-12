import catchAsync from '../../utils/catchAsync'
import { CommentService } from './comment.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createComment = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { post, comment } = req.body

  const payload = {
    user: userId,
    post,
    comment,
  }
  const result = await CommentService.createCommentIntoDB(payload)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Created Successfully!',
    data: result,
  })
})

const getCommentByPostId = catchAsync(async (req, res) => {
  const postId = req.params.postId
  const result = await CommentService.getCommentsByPostIdFromDB(
    postId,
    req?.query,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Retrieved Successfully!',
    meta: result.meta,
    data: result.result,
  })
})

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params
  const { comment } = req.body
  const userId = req.user!._id
  const result = await CommentService.updateCommentIntoDB(id, userId, comment)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Updated Successfully!!!',
    data: result,
  })
})

export const CommentControllers = {
  createComment,
  getCommentByPostId,
  updateComment,
}
