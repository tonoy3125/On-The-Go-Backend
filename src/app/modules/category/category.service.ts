import QueryBuilder from '../../builder/QueryBuilder'
import { categorySearchableField } from './category.constant'
import { TCategory } from './category.interface'
import { Category } from './category.model'

const createCategoryInDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}

const getCategoryFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(categorySearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await categoryQuery.countTotal()
  const result = await categoryQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const CategoryServices = {
  createCategoryInDB,
  getCategoryFromDB,
}
