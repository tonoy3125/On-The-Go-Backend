export type TReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

export type TReaction = {
  reactionId: TReactionType
  post: string
  user: string
}
