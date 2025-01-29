import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ReactionControllers } from './reaction.controller'
import { ReactionValidations } from './reaction.validation'
import auth from '../../middlewares/auth'

const router = express.Router()

router.patch(
  '/change',
  auth('admin', 'user'),
  validateRequest(ReactionValidations.changeReactionValidationSchema),
  ReactionControllers.changeReactionByPostId,
)

export const ReactionRoutes = router
