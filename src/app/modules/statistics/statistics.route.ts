import { Router } from 'express'
import auth from '../../middlewares/auth'
import { StatisticsControllers } from './statistics.controller'

const router = Router()

router.get(
  '/payment',
  auth('admin'),
  StatisticsControllers.PaymentStatisticsController,
)

export const StatisticsRoutes = router
