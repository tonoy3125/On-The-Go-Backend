import express from 'express'
import { GroupControllers } from './group.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth('admin', 'user'), GroupControllers.createGroup)

router.get('/my-group', auth('admin', 'user'), GroupControllers.getUsersGroups)

router.get(
  '/my-group-suggestions',
  auth('admin', 'user'),
  GroupControllers.getGroupSuggestions,
)

router.get(
  '/groupDetails/:groupId',
  auth('admin', 'user'),
  GroupControllers.getGroupDetailsById,
)

router.get(
  '/groupMember/:groupId',
  auth('admin', 'user'),
  GroupControllers.getGroupMembersByGroupId,
)

router.put(
  '/updateGroup/:groupId',
  auth('admin', 'user'),
  GroupControllers.updateGroupById,
)

export const GroupRoutes = router
