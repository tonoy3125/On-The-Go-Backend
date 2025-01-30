import express from 'express'
import { FollowerControllers } from './follower.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create',
  auth('admin', 'user'),
  FollowerControllers.createFollower,
)
router.put('/delete', auth('admin', 'user'), FollowerControllers.deleteFollower)

export const FollowerRoutes = router
