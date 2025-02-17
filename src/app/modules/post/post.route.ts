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
  auth('admin', 'user'),
  PostControllers.uploadPostImage,
)

router.get(
  '/userPost/:userId',
  auth('admin', 'user'),
  PostControllers.getUserPost,
)

router.get('/', auth('admin', 'user'), PostControllers.getAllPost)

router.get('/:id', auth('admin', 'user'), PostControllers.getPostById)

router.delete('/:id', auth('admin', 'user'), PostControllers.deletePost)

export const PostRoutes = router
