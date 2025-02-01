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

const getUsersGroupsFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const skip = (page - 1) * limit

  const pipeLine = [
    {
      $match: {
        user: userId,
      },
    },
    {
      $lookup: {
        from: 'groups',
        localField: 'group',
        foreignField: '_id',
        as: 'group',
      },
    },
  ]

  // Retrieve paginated results
  const result = await GroupMember.aggregate([
    ...pipeLine,
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        group: 1,
      },
    },
  ])

  // Modify the result to extract the 'group' array from each document
  const modifiedResult = result.map((item) => item.group[0])

  // Retrieve total count of documents
  const totalCountQuery = await GroupMember.aggregate([
    ...pipeLine,
    {
      $count: 'totalCount',
    },
  ])

  // Extract totalCount from the result or default to 0 if no documents
  const totalCount =
    totalCountQuery.length > 0 ? totalCountQuery[0].totalCount : 0

  return { result: modifiedResult, totalCount }
}

export const GroupService = {
  createGroupIntoDB,
  getUsersGroupsFromDB,
}
