import { model, Schema } from 'mongoose'
import { TGroupMember } from './groupMember.interface'

const groupMemberSchema = new Schema<TGroupMember>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    group: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Group',
    },
    role: {
      type: String,
      enum: ['owner', 'member', 'admin'],
      default: 'member',
      required: true,
    },
  },
  { timestamps: true },
)

export const GroupMember = model<TGroupMember>('GroupMember', groupMemberSchema)
