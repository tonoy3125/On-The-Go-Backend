import mongoose, { Schema } from 'mongoose'
import { TPayment } from './payment.interface'

const PaymentSchema: Schema = new Schema<TPayment>(
  {
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: { type: String, required: true, default: 'paid' },
  },
  { timestamps: true },
)

const Payment = mongoose.model('Payment', PaymentSchema)

export default Payment
