import { model, Schema } from 'mongoose'
import { TPost } from './post.interface'

const postSchema = new Schema<TPost>(
  {
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    categories: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'Category',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: false,
    },
    reactionCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    premium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Post = model<TPost>('Post', postSchema)
