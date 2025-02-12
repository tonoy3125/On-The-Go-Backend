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

export const CommentService = {
  createCommentIntoDB,
}
