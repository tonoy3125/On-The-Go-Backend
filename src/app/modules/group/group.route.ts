import express from 'express'
import { GroupControllers } from './group.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth('admin', 'user'), GroupControllers.createGroup)

router.get('/my-group', auth('admin', 'user'), GroupControllers.getUsersGroups)

export const GroupRoutes = router
