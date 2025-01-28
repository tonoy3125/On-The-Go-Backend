import { model, Schema, Types } from 'mongoose'
import { TGroup } from './group.interface'

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: '',
    },
    privacy: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
      required: true,
    },
    memberCount: {
      type: Number,
      required: true,
    },
    GroupOwner: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const Group = model<TGroup>('Group', groupSchema)
