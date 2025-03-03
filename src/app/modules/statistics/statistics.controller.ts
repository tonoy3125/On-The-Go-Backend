import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatisticsServices } from './statistics.service'

const PaymentStatisticsController = catchAsync(async (req, res) => {
  const { from, to } = req.query
  const fromDate = from ? new Date(from as string) : undefined
  const toDate = to ? new Date(to as string) : undefined

  const payload = {
    from: fromDate,
    to: toDate,
  }

  const result = await StatisticsServices.getPaymentStatistic(payload)
  sendResponse(res, {
    data: result,
    success: true,
    message: 'SuccessFully Get Payment Statistics',
    statusCode: 200,
  })
})

const getUserStatistics = catchAsync(async (req, res) => {
  const result = await StatisticsServices.getUserStatistics()
  sendResponse(res, {
    data: result,
    success: true,
    message: 'Successfully Get User Statistics',
    statusCode: 200,
  })
})

export const StatisticsControllers = {
  PaymentStatisticsController,
  getUserStatistics,
}
