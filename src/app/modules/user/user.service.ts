import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/AppError'
import { userSearchableField } from './user.constant'
import { User } from './user.model'
import httpStatus from 'http-status'

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await userQuery.countTotal()
  const result = await userQuery.modelQuery

  return {
    meta,
    result,
  }
}

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id)
  return result
}

const updateUserRoleInDB = async (id: string, newRole: string) => {
  // Fetch the user by ID
  const user = await User.findById(id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this ID')
  }

  // Check if the current role is the same as the new role
  if (user.role === newRole) {
    return { message: `Role was already ${newRole}` }
  }

  // Update the user's role
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role: newRole },
    { new: true, runValidators: true },
  )

  return updatedUser
}

export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserRoleInDB,
}
