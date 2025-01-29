import express from 'express'
import { PostControllers } from './post.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth('admin', 'user'), PostControllers.CreatePost)

export const PostRoutes = router
