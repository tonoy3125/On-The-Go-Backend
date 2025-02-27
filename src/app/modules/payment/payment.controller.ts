/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { TPaymentTokenInfo } from './payment.interface'
import config from '../../config'
import { PaymentServices } from './payment.service'
export const successPaymentController = catchAsync(async (req, res) => {
  const paymentInfoToken = req.query.pt as string
  //   console.log('Payment process', paymentInfoToken)
  let decode
  try {
    decode = jwt.verify(paymentInfoToken, config.signature_key as string)
  } catch (error) {
    sendResponse(res, {
      data: null,
      success: false,
      message: 'invalid payment info',
      statusCode: 400,
    })
  }

  const { amount, transactionId, userId } = decode as TPaymentTokenInfo
  const result = await PaymentServices.createPayment(
    Number(amount),
    transactionId,
    userId,
  )
  res.send(result)
})
export const failedPaymentController = catchAsync(async (req, res) => {
  const paymentInfoToken = req.query.pt as string
  try {
    jwt.verify(paymentInfoToken, config.signature_key as string)
  } catch (error) {
    sendResponse(res, {
      data: null,
      success: false,
      message: 'invalid payment info',
      statusCode: 400,
    })
  }

  const result = await PaymentServices.failedPayment()
  res.send(result)
})
