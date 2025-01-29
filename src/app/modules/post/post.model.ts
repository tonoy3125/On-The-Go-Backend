import mongoose, { model, Schema, Types } from 'mongoose'
import { TPost } from './post.interface'

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    categories: {
      type: [Types.ObjectId],
      required: true,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
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
