import express from 'express'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const routerModules = [
  {
    path: '/users',
    route: UserRoutes,
  },
]

export const routes = routerModules.map((item) =>
  router.use(item?.path, item?.route),
)
