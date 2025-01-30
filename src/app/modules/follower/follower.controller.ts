import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { FollowerServices } from './follower.service'
import catchAsync from '../../utils/catchAsync'

const createFollower = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const { follower } = req.body
  const payload = {
    following: follower,
    follower: userId,
  }
  const result = await FollowerServices.createFollowerIntoDB(payload)
  //   send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Follower Created successfully!',
    data: result,
  })
})



export const FollowerControllers = {
  createFollower,
}
