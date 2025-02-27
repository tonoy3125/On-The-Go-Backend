import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUserRoles = keyof typeof USER_ROLE

export type TUser = {
  _id: string
  name: string
  email: string
  password: string
  phone: number
  role: TUserRoles
  image?: string
  isPremium: boolean
  createdAt: string
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
