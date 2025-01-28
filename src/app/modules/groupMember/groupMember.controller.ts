import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { GroupMemberServices } from './groupMember.service'
import httpStatus from 'http-status'

const joinGroup = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const groupId = req.params.groupId
  const result = await GroupMemberServices.joinGroupIntoDB(userId, groupId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Joined Successfully',
    data: result,
  })
})

const getGroupMembers = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const groupId = req.params.groupId
  const result = await GroupMemberServices.getGroupMembersFromDB(
    userId,
    groupId,
    req.query,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Members Retrieved Successfully',
    meta: result.meta,
    data: result.result,
  })
})

export const GroupMemberControllers = {
  joinGroup,
  getGroupMembers,
}
