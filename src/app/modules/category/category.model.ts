import { model, Schema } from 'mongoose'
import { TCategory } from './category.interface'

const categorySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)

export const Category = model<TCategory>('Category', categorySchema)
