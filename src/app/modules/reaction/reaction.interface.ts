import { Types } from 'mongoose'

export type TReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

export type TReaction = {
  reaction: TReactionType
  post: Types.ObjectId
  user: Types.ObjectId
}
