/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AppError } from '../../errors/AppError'
import { TUser } from '../user/user.interface'
import { TPost } from './post.interface'
import { Post } from './post.model'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}

const deletePostFromDB = async (id: string, user: TUser) => {
  const isExists = await Post.findById(id)
  if (!isExists) {
    throw new AppError(404, 'Post not found')
  }

  if (
    isExists.user.toString() !== user._id.toString() &&
    user.role !== 'admin'
  ) {
    ;``
    throw new AppError(403, 'Unauthorized access')
  }

  const result = await Post.findByIdAndDelete(isExists._id)
  return result
}

export const PostServices = {
  createPostIntoDB,
  deletePostFromDB,
}
