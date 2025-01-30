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

export const FollowerServices = {
  createFollowerIntoDB,
}
