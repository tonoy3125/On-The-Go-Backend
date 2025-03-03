import Payment from '../payment/payment.model'
import { User } from '../user/user.model'

const getPaymentStatistic = async ({
  from,
  to,
}: {
  from: Date | undefined
  to: Date | undefined
}) => {
  const query: Record<string, unknown> = {}

  if (from) {
    query.createdAt = {
      $gte: from || new Date(),
    }
  }

  if (to) {
    query.createdAt = {
      ...(query.createdAt || {}),
      $lte: to || new Date(),
    }
  }

  const result = await Payment.find(query).sort({ createdAt: -1 })

  return result
}

const getUserStatistics = async () => {
  const premiumUserCount = await User.countDocuments({
    isPremium: true,
    role: { $ne: 'admin' },
  })
  const normalUserCount = await User.countDocuments({
    isPremium: false,
    role: { $ne: 'admin' },
  })

  return { premiumUserCount, normalUserCount }
}

export const StatisticsServices = {
  getPaymentStatistic,
  getUserStatistics,
}
