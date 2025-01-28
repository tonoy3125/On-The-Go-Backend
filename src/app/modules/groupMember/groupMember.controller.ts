import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { GroupMemberServices } from './groupMember.service'

const joinGroup = catchAsync(async (req, res) => {
  const userId = req.user!._id
  const groupId = req.params.groupId
  const result = await GroupMemberServices.joinGroupIntoDB(userId, groupId)
  sendResponse(res, {
    message: 'group joined successfully',
    success: true,
    data: result,
    statusCode: 200,
  })
})

export const GroupMemberControllers = {
  joinGroup,
}
