export type TPayment = {
  amount: number
  transactionId: string
  status: string
}
export type TPaymentPayload = {
  amount: number
  cus_name: string
  cus_email: string
  cus_phone: number
  cus_add: string
  tran_id: string
}

export type TPaymentTokenInfo = {
  transactionId: string
  userId: string
  amount: string
}
