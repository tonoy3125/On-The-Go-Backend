import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'

const router = express.Router()

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser)

router.get('/:id', auth('admin', 'user'), UserControllers.getSingleUser)

export const UserRoutes = router
