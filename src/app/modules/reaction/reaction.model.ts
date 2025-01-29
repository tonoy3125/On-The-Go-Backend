import { model, Schema } from 'mongoose'
import { TReaction } from './reaction.interface'

const reactionSchema = new Schema<TReaction>(
  {
    reactionId: {
      type: String,
      enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const Reaction = model<TReaction>('Reaction', reactionSchema)
