import express from 'express'
import { GroupMemberControllers } from './groupMember.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/join-group/:groupId',
  auth('admin', 'user'),
  GroupMemberControllers.joinGroup,
)

export const GroupMemberRoutes = router
