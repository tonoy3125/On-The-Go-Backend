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
    .sort('-createdAt')

  const queryModel = new QueryBuilder(model, query).paginate()

  const meta = await queryModel.countTotal()
  const result = await queryModel.modelQuery

  return { result, meta }
}

export const CommentService = {
  createCommentIntoDB,
  getCommentsByPostIdFromDB,
}
