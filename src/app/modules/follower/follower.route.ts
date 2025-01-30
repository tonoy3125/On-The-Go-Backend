import express from 'express'
import { FollowerControllers } from './follower.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth('admin', 'user'), FollowerControllers.createFollower)

export const FollowerRoutes = router
