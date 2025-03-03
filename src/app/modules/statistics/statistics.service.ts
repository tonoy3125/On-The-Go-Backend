import Payment from '../payment/payment.model'

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

export const statisticsServices = {
  getPaymentStatistic,
}
