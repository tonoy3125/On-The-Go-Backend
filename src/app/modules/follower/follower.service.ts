import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/AppError'
import { User } from '../user/user.model'
import { TFollower } from './follower.interface'
import { Follower } from './follower.model'

const createFollowerIntoDB = async (payload: TFollower) => {
  // whom to follow
  const isFollowingExist = await User.findOne({ _id: payload.following })
  if (!isFollowingExist) {
    throw new AppError(404, 'User not found')
  }

  // who follows
  const isFollowerExist = await User.findOne({ _id: payload.follower })

  if (!isFollowerExist) {
    throw new AppError(404, 'Follower not found')
  }

  const isFollowing = await Follower.findOne({
    following: isFollowingExist._id,
    follower: isFollowerExist._id,
  })
  if (isFollowing) {
    const result = await Follower.deleteOne({
      following: isFollowingExist._id,
      follower: isFollowerExist._id,
    })
    return result
  }

  const result = await Follower.create(payload)
  return result
}

const deleteFollowerIntoDB = async (payload: TFollower) => {
  const isFollowingExist = await User.findOne({ _id: payload.following })
  if (!isFollowingExist) {
    throw new AppError(404, 'Following User not found')
  }
  const isFollowerExist = await User.findOne({ _id: payload.follower })
  if (!isFollowerExist) {
    throw new AppError(404, 'Follower not found')
  }

  const isFollowing = await Follower.findOne({
    following: isFollowingExist._id,
    follower: isFollowerExist._id,
  })
  if (!isFollowing) {
    throw new AppError(404, 'Following not found')
  }

  const result = await Follower.deleteOne({
    following: isFollowingExist._id,
    follower: isFollowerExist._id,
  })
  return result
}

const getFollowingFromDB = async (
  following: string,
  query: Record<string, unknown>,
) => {
  const model = Follower.find({ following: following })
    .populate('user')
    .populate('follower')
    .sort('-createdAt')

  const categoryQuery = new QueryBuilder(model, query).sort().paginate()

  const meta = await categoryQuery.countTotal()
  const result = await categoryQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const FollowerServices = {
  createFollowerIntoDB,
  deleteFollowerIntoDB,
  getFollowingFromDB,
}
