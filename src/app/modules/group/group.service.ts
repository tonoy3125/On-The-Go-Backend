/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import { TGroup } from './group.interface'
import { Group } from './group.model'
import { AppError } from '../../errors/AppError'
import { GroupMember } from '../groupMember/groupMember.model'

const createGroupIntoDB = async (payload: TGroup, userId: string) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const groupPayload = { ...payload, GroupOwner: userId, memberCount: 1 }

    // Create the group document
    const result = await Group.create([groupPayload], { session })

    if (!result[0]) {
      throw new AppError(400, 'Failed to create group')
    }

    await GroupMember.create(
      [
        {
          group: result[0]._id,
          user: userId,
          role: 'owner',
        },
      ],
      { session },
    )

    await session.commitTransaction()
    session.endSession()

    return result[0]
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(400, 'Failed to create group')
  }
}

export const GroupService = {
  createGroupIntoDB,
}
