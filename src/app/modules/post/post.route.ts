import express from 'express'
import { PostControllers } from './post.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { PostValidations } from './post.validation'
import { multerUpload } from '../../config/cloudinaryMulter.config'

const router = express.Router()

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.CreatePost,
)

router.post(
  '/upload-image',
  multerUpload.single('file'),
  PostControllers.uploadPostImage,
)

export const PostRoutes = router
