import express from 'express'
import auth from '../../middlewares/auth'
import { CommentControllers } from './comment.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CommentValidations } from './comment.validation'

const router = express.Router()

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(CommentValidations.createCommentValidationSchema),
  CommentControllers.createComment,
)

export const CommentRoutes = router
