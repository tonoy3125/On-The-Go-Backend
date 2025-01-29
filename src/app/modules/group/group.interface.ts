import { Types } from 'mongoose'

export type GroupPrivacy = 'public' | 'private'

export type TGroup = {
  name: string
  description: string
  image: string
  privacy: GroupPrivacy
  memberCount: number
  GroupOwner: Types.ObjectId
}
