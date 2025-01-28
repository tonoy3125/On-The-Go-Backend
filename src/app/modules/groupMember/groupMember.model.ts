import { model, Schema, Types } from 'mongoose'

const groupMemberSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },

    group: {
      type: Types.ObjectId,
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

export const GroupMember = model('GroupMember', groupMemberSchema)
