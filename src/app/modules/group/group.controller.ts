import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { GroupService } from './group.service'
import httpStatus from 'http-status'

const createGroup = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const result = await GroupService.createGroupIntoDB(req.body, userId)
  //   send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Created Successfully',
    data: result,
  })
})

export const GroupControllers = {
  createGroup,
}
