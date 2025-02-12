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

export const CommentControllers = {
  createComment,
}
