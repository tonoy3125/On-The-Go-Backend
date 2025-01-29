import { z } from 'zod'

const createPostValidationSchema = z.object({
  body: z.object({
    content: z.string({ required_error: 'Content is required' }),
    images: z.array(z.string().url('Each image must be a valid URL')),
    categories: z.array(z.string()),
    premium: z.boolean().optional(),
    group: z.string().optional(),
  }),
})

export const PostValidations = {
  createPostValidationSchema,
}
