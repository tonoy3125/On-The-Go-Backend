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

const getAllFollowingFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  // console.log(userId)
  const model = Follower.find({ follower: userId })
    .populate('following')
    .populate('follower')
    .sort('-createdAt')

  const FollowingQuery = new QueryBuilder(model, query).sort().paginate()

  const meta = await FollowingQuery.countTotal()
  const result = await FollowingQuery.modelQuery

  return {
    meta,
    result,
  }
}

const getAllFollowerFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  console.log(userId)
  const model = Follower.find({ following: userId })
    .populate('following')
    .populate('follower')
    .sort('-createdAt')

    

  const FollowingQuery = new QueryBuilder(model, query).sort().paginate()
  // console.log(FollowingQuery)

  const meta = await FollowingQuery.countTotal()
  const result = await FollowingQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const FollowerServices = {
  createFollowerIntoDB,
  deleteFollowerIntoDB,
  getAllFollowingFromDB,
  getAllFollowerFromDB,
}
