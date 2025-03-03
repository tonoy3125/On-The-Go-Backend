import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { GroupRoutes } from '../modules/group/group.route'
import { GroupMemberRoutes } from '../modules/groupMember/groupMember.route'
import { PostRoutes } from '../modules/post/post.route'
import { ReactionRoutes } from '../modules/reaction/reaction.route'
import { FollowerRoutes } from '../modules/follower/follower.route'
import { CommentRoutes } from '../modules/comment/comment.route'
import { PaymentRoutes } from '../modules/payment/payment.route'
import { StatisticsRoutes } from '../modules/statistics/statistics.route'

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
  {
    path: '/reaction',
    route: ReactionRoutes,
  },
  {
    path: '/follower',
    route: FollowerRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/statistics',
    route: StatisticsRoutes,
  },
]

export const routes = routerModules.map((item) =>
  router.use(item?.path, item?.route),
)
