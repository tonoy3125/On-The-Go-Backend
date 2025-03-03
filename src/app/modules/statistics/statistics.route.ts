import { Router } from 'express'
import auth from '../../middlewares/auth'
import { StatisticsControllers } from './statistics.controller'

const router = Router()

router.get(
  '/payment',
  auth('admin'),
  StatisticsControllers.PaymentStatisticsController,
)

router.get('/recent', auth('admin'), StatisticsControllers.getUserStatistics)

export const StatisticsRoutes = router
