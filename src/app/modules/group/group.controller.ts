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

const getGroupDetailsById = catchAsync(async (req, res) => {
  const groupId = req.params.groupId
  const userId = req.user!._id

  const result = await GroupService.getGroupDetailsByIdFromDB(groupId, userId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Details Retrieved Successfully',
    data: result,
  })
})

const getGroupMembersByGroupId = catchAsync(async (req, res) => {
  const groupId = req.params.groupId
  const userId = req.user!._id
  const result = await GroupService.getGroupMembersByGroupId(
    groupId,
    userId,
    req?.query,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Members By GroupId Retrieved Successfully!',
    meta: result.meta,
    data: result.result,
  })
})

const updateGroupById = catchAsync(async (req, res) => {
  const groupId = req.params.groupId
  const userId = req.user!._id
  const result = await GroupService.updateGroupByIdIntoDB(
    groupId,
    userId,
    req?.body,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Updated Successfully',
    data: result,
  })
})

export const GroupControllers = {
  createGroup,
  getUsersGroups,
  getGroupSuggestions,
  getGroupDetailsById,
  getGroupMembersByGroupId,
  updateGroupById,
}
