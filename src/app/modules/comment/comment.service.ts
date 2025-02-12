import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/AppError'
import { Post } from '../post/post.model'
import { TComment } from './comment.interface'
import { Comment } from './comment.model'

const createCommentIntoDB = async (payload: TComment) => {
  const isPostExists = await Post.findById(payload.post)
  console.log(isPostExists)
  if (!isPostExists) {
    throw new AppError(404, 'Post not found')
  }
  const result = await Comment.create(payload)
  isPostExists.commentCount = isPostExists.commentCount + 1
  await isPostExists.save()
  return result
}

const getCommentsByPostIdFromDB = async (
  postId: string,
  query: Record<string, unknown>,
) => {
  const isPostExists = await Post.findById(postId)
  if (!isPostExists) {
    throw new AppError(404, 'Post not found')
  }

  const model = Comment.find({ post: isPostExists._id })
    .populate('user')
    .populate('post')
    .sort('-createdAt')

  const queryModel = new QueryBuilder(model, query).paginate()

  const meta = await queryModel.countTotal()
  const result = await queryModel.modelQuery

  return { result, meta }
}

const updateCommentIntoDB = async (
  id: string,
  userId: string,
  newComment: string,
) => {
  const comment = await Comment.findById(id)
  // console.log('Comment Is', comment)
  if (!comment) {
    throw new Error('Comment not found')
  }

  if (comment.user.toString() !== userId.toString()) {
    throw new Error('Unauthorized access')
  }

  const isPostExists = await Post.findById(comment.post)
  // console.log('is Post exits', isPostExists)
  if (!isPostExists) {
    throw new Error('Post not found')
  }

  const result = await Comment.findByIdAndUpdate(
    id,
    {
      comment: newComment,
    },
    {
      new: true,
      runValidators: true,
    },
  )

  return result
}

const deleteCommentfromDB = async (id: string, userId: string) => {
  const comment = await Comment.findById(id)
  if (!comment) {
    throw new AppError(404, 'Comment not found')
  }

  if (comment.user.toString() !== userId.toString()) {
    throw new AppError(403, 'Unauthorized access')
  }

  const isPostExists = await Post.findById(comment.post)
  if (!isPostExists) {
    throw new AppError(404, 'Post not found')
  }

  const result = await Comment.findByIdAndDelete(id)
  isPostExists.commentCount = isPostExists.commentCount - 1
  await isPostExists.save()
  return result
}

export const CommentService = {
  createCommentIntoDB,
  getCommentsByPostIdFromDB,
  updateCommentIntoDB,
  deleteCommentfromDB,
}
