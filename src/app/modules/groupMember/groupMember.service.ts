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

export const GroupMemberServices = {
  joinGroupIntoDB,
}
