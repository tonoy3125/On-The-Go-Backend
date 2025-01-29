import express from 'express'
import { PostControllers } from './post.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { PostValidations } from './post.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(PostValidations.createPostValidationSchema),
  auth('admin', 'user'),
  PostControllers.CreatePost,
)

export const PostRoutes = router
