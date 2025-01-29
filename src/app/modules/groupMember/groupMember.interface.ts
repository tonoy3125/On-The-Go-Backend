import { Types } from 'mongoose'

export type TGroupMemberRole = 'owner' | 'member' | 'admin'

export type TGroupMember = {
  user: Types.ObjectId
  group: Types.ObjectId
  role: TGroupMemberRole
}
