import { Router } from 'express'
import auth from '../../middlewares/auth'
import { StatisticsControllers } from './statistics.controller'

const router = Router()

router.get(
  '/payment',
  auth('admin'),
  StatisticsControllers.PaymentStatisticsController,
)

router.get('/user', auth('admin'), StatisticsControllers.getUserStatistics)

router.get('/recent', auth('admin'), StatisticsControllers.getRecentStatistics)

router.get('/top-user', auth('admin'), StatisticsControllers.getTopUsersByPosts)

export const StatisticsRoutes = router
