import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/AppError'
import { categorySearchableField } from './category.constant'
import { TCategory } from './category.interface'
import { Category } from './category.model'
import httpStatus from 'http-status'

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

const getCategoryNameFromDB = async (name: string) => {
  const model = Category.find()

  // Build the query with filters, search, sorting, and pagination
  const categoryQuery = new QueryBuilder(model, { searchTerm: name }).search(
    categorySearchableField,
  )

  // Fetch the metadata and results
  const result = await categoryQuery.modelQuery

  return result
}

const deleteCategoryFromDB = async (id: string) => {
  const category = await Category.findById(id)

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category Not Found by this ID')
  }

  const result = await Category.findByIdAndDelete(id)
  return result
}

export const CategoryServices = {
  createCategoryInDB,
  getCategoryFromDB,
  getCategoryNameFromDB,
  deleteCategoryFromDB,
}
