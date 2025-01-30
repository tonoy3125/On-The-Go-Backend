import { model, Schema } from 'mongoose'
import { TFollower } from './follower.interface'

const followerSchema = new Schema<TFollower>(
  {
    following: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const Follower = model<TFollower>('Follower', followerSchema)
