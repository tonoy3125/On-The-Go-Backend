/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/AppError'
import { Reaction } from '../reaction/reaction.model'
import { TUser } from '../user/user.interface'
import { TPost } from './post.interface'
import { Post } from './post.model'
import { Group } from '../group/group.model'
import { GroupMember } from '../groupMember/groupMember.model'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}

const getAllPostsFromDB = async (
  user: TUser,
  query: Record<string, unknown>,
) => {
  let model = Post.find()
    .populate('user')
    .populate('categories')
    .populate('group')
  if (typeof query.categories === 'string') {
    const ids = query.categories
      .split(',')
      .map((id: string) => new mongoose.Types.ObjectId(id))
    model = model.find({ categories: { $in: ids } })
  }
  delete query.categories

  if (query.premium && user && user.isPremium) {
    model.find({ premium: true })
  } else {
    model = model.find({ premium: false })
  }
  delete query.premium

  if (typeof query.group === 'string') {
    const groupIds = query.group
      .split(',')
      .map((id: string) => new mongoose.Types.ObjectId(id))
    for (const groupId of groupIds) {
      const group = await Group.findById(groupId).select('privacy')
      if (!group) {
        throw new AppError(404, 'Group not found')
      }

      if (group.privacy == 'private') {
        const isMember = await GroupMember.findOne({
          group: groupId,
          user: user._id,
        })
        if (!isMember) {
          throw new AppError(400, 'You are not a member of this group')
        }
      }
    }
  }

  const queryModel = new QueryBuilder(model, query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(['title', 'content'])

  const meta = await queryModel.countTotal()
  const result = await queryModel.modelQuery

  const postObjs: any[] = result.map((result) => result.toObject())

  for (let i = 0; i < postObjs.length; i++) {
    const post = postObjs[i]
    // console.log('This is Post data', post)
    // console.log('This is User Data', userId)
    const reacted = await Reaction.findOne({
      post: post._id as string,
      // user: userId,
    })
    console.log(reacted)

    postObjs[i] = {
      ...post,
      reacted,
    }
  }

  return { result: postObjs, meta }
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
    console.log('This is Post data', post)
    console.log('This is User Data', userId)
    const reacted = await Reaction.findOne({
      post: post._id as string,
      // user: userId,
    })
    console.log(reacted)

    postObjs[i] = {
      ...post,
      reacted,
    }
  }

  return { result: postObjs, meta }
}

const getPostByIdIntoDB = async (id: string) => {
  const result = await Post.findById(id).populate('user').populate('categories')
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
  getAllPostsFromDB,
  getUserProfilePostByUserId,
  getPostByIdIntoDB,
  deletePostFromDB,
}
