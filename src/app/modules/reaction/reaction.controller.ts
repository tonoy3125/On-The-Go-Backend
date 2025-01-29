import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ReactionServices } from './reaction.service'
import httpStatus from 'http-status'

const changeReactionByPostId = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { postId, reaction } = req.body
  const result = await ReactionServices.changeReactionByPostIdIntoDB(
    userId,
    postId,
    reaction,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reaction Changed Successfully!',
    data: result,
  })
})

export const ReactionControllers = {
  changeReactionByPostId,
}
