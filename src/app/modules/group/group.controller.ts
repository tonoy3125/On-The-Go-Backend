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

const getUsersGroups = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const result = await GroupService.getUsersGroupsFromDB(userId, req.query)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Groups Retrieved Successfully',
    data: result,
  })
})

const getGroupSuggestions = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const result = await GroupService.getGroupSuggestionsFromDB(userId, req.query)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Suggestions Retrieved Successfully!!',
    data: result?.result,
    meta: result?.totalCount,
  })
})

export const GroupControllers = {
  createGroup,
  getUsersGroups,
  getGroupSuggestions,
}
