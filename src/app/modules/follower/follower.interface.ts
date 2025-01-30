import { Types } from 'mongoose'

export type TFollower = {
  following: Types.ObjectId
  follower: Types.ObjectId
}
