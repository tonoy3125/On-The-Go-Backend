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
    groupId,
    userId,
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

const leaveGroup = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const groupId = req.params.groupId
  const result = await GroupMemberServices.leaveGroupIntoDB(userId, groupId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Group Left Successfully',
    data: result,
  })
})

const checkMembership = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const groupId = req.params.groupId

  const isMember = await GroupMemberServices.checkMembershipInDB(
    userId,
    groupId,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: isMember
      ? 'User is a member of the group'
      : 'User is not a member of the group',
    data: { isMember },
  })
})

export const GroupMemberControllers = {
  joinGroup,
  getGroupMembers,
  leaveGroup,
  checkMembership,
}
