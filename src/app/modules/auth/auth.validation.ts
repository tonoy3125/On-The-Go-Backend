import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Passowrd is required' }),
  }),
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User Email is Required',
    }),
  }),
})

const resetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z.string({
      required_error: 'New Password is Required',
    }),
    confirmNewPassword: z.string({
      required_error: 'Confirm New Password is Required',
    }),
  }),
})

export const AuthValidations = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
}
