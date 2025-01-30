import { model, Schema } from 'mongoose'
import { TFollower } from './follower.interface'

const followerSchema = new Schema<TFollower>(
  {
    following: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

export const Follower = model<TFollower>('Follower', followerSchema)
