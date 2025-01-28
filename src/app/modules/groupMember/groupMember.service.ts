import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/AppError'
import { Group } from '../group/group.model'
import { GroupMember } from './groupMember.model'

const joinGroupIntoDB = async (userId: string, groupId: string) => {
  const isAlreadyMember = await GroupMember.findOne({
    user: userId,
    group: groupId,
  })
  if (isAlreadyMember) {
    throw new AppError(400, 'You are already a member of this group')
  }
  const result = await GroupMember.create({
    user: userId,
    group: groupId,
    role: 'member',
  })

  await Group.updateOne({ _id: groupId }, { $inc: { memberCount: 1 } })

  return result
}

const getGroupMembersFromDB = async (
  groupId: string,
  userId: string,
  query: Record<string, unknown>,
) => {
  const isGroupExist = await Group.findById(groupId)

  if (!isGroupExist) {
    throw new AppError(404, 'Group not found')
  }

  if (isGroupExist.privacy == 'private') {
    const isMember = await GroupMember.findOne({
      user: userId,
      group: groupId,
    })

    if (!isMember) {
      throw new AppError(400, 'You are not a member of this group')
    }
  }

  const model = GroupMember.find({ group: groupId })

  const groupQuery = new QueryBuilder(model, query).sort().paginate().fields()
  const meta = await groupQuery.countTotal()
  const result = await groupQuery.modelQuery

  return {
    meta,
    result,
  }
}

const leaveGroupIntoDB = async (userId: string, groupId: string) => {
  const isMember = await GroupMember.findOne({
    user: userId,
    group: groupId,
  })
  if (!isMember) {
    throw new AppError(400, 'You are not a member of this group')
  }
  const result = await GroupMember.findByIdAndDelete(isMember._id)
  return result
}

export const GroupMemberServices = {
  joinGroupIntoDB,
  getGroupMembersFromDB,
  leaveGroupIntoDB,
}
