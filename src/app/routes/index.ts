import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { CategoryRoutes } from '../modules/category/category.route'

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
]

export const routes = routerModules.map((item) =>
  router.use(item?.path, item?.route),
)
