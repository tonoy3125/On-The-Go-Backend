import { TCategory } from './category.interface'
import { Category } from './category.model'

const createCategoryInDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}

export const CategoryServices = {
  createCategoryInDB,
}
