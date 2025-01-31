import { model, Schema } from 'mongoose'
import { TComment } from './comment.interface'

const commentSchema = new Schema<TComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const Comment = model<TComment>('Comment', commentSchema)
