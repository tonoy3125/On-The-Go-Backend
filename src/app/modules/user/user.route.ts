import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
import { updateUserProfileImage, UserControllers } from './user.controller'
import { multerUpload } from '../../config/cloudinaryMulter.config'

const router = express.Router()

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser)

router.get('/:id', auth('admin', 'user'), UserControllers.getSingleUser)

router.get(
  '/profile/:userId',
  auth('admin', 'user'),
  UserControllers.getUserProfile,
)

router.patch('/role/:id', auth(USER_ROLE.admin), UserControllers.updateUserRole)

router.patch('/:id', auth('admin', 'user'), UserControllers.updateUser)

router.put(
  '/update-profile-image',
  auth('admin', 'user'),
  multerUpload.single('file'),
  updateUserProfileImage,
)

export const UserRoutes = router
