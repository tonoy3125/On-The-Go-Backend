import express from 'express'
import { CategoryControllers } from './category.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth('admin'), CategoryControllers.createCategory)

export const CategoryRoutes = router
