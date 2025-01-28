import express from 'express'
import { CategoryControllers } from './category.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth('admin'), CategoryControllers.createCategory)

router.get('/', CategoryControllers.getAllCategory)

router.get('/:name', CategoryControllers.getAllCategoryByName)

router.delete('/:id', auth('admin'), CategoryControllers.deleteCategory)

export const CategoryRoutes = router
