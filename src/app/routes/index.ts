import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { GroupRoutes } from '../modules/group/group.route'
import { GroupMemberRoutes } from '../modules/groupMember/groupMember.route'
import { PostRoutes } from '../modules/post/post.route'

const router = express.Router()

const routerModules = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/group',
    route: GroupRoutes,
  },
  {
    path: '/group-member',
    route: GroupMemberRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
]

export const routes = routerModules.map((item) =>
  router.use(item?.path, item?.route),
)
