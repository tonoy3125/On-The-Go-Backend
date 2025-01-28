import express from 'express'
import { GroupControllers } from './group.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth('admin', 'user'), GroupControllers.createGroup)

export const GroupRoutes = router
