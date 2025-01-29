import { Types } from 'mongoose'

export type TPost = {
  content: string
  images: string[]
  categories: Types.ObjectId[]
  premium: boolean
  user: Types.ObjectId
  group?: string
  reactionCount: number
  upvoteCount: number
  downvoteCount: number
  commentCount: number
}
