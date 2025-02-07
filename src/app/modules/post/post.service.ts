/* eslint-disable @typescript-eslint/no-unused-expressions */
import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/AppError'
import { Reaction } from '../reaction/reaction.model'
import { TUser } from '../user/user.interface'
import { TPost } from './post.interface'
import { Post } from './post.model'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}

const getUserProfilePostByUserId = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const model = Post.find({ user: userId, group: { $exists: false } })
    .populate('user')
    .populate('categories')
  const queryModel = new QueryBuilder(model, query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(['title', 'content'])

  const meta = await queryModel.countTotal()
  const result = await queryModel.modelQuery

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postObjs: any[] = result.map((result) => result.toObject())

  for (let i = 0; i < postObjs.length; i++) {
    const post = postObjs[i]
    const reacted = await Reaction.findOne({
      post: post._id as string,
      user: userId,
    })

    postObjs[i] = {
      ...post,
      reacted,
    }
  }

  return { result: postObjs, meta }
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
  getUserProfilePostByUserId,
  deletePostFromDB,
}
