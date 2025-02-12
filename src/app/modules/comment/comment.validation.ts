import { z } from 'zod'

const createCommentValidationSchema = z.object({
  body: z.object({
    // user: z.string(),
    post: z.string(),
    comment: z.string({ required_error: 'Comment is required' }),
  }),
})

export const CommentValidations = {
  createCommentValidationSchema,
}
