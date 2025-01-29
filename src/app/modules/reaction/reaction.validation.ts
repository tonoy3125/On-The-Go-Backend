import { z } from 'zod'

// Define the valid reaction types
const ReactionTypeSchema = z.enum([
  'like',
  'love',
  'haha',
  'wow',
  'sad',
  'angry',
])

const changeReactionValidationSchema = z.object({
  body: z.object({
    postId: z.string({ message: 'post id is required as string' }),
    reaction: ReactionTypeSchema,
  }),
})

export const ReactionValidations = {
  changeReactionValidationSchema,
}
