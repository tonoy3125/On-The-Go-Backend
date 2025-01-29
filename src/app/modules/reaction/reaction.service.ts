import { Post } from '../post/post.model'
import { TReactionType } from './reaction.interface'
import { Reaction } from './reaction.model'

const changeReactionByPostIdIntoDB = async (
  userId: string,
  postId: string,
  reaction: TReactionType,
) => {
  const isReactionExist = await Reaction.findOne({
    user: userId,
    post: postId,
  })

  if (isReactionExist) {
    if (isReactionExist.reaction == reaction) {
      const res = await Reaction.findByIdAndDelete(isReactionExist._id)
      await Post.findByIdAndUpdate(isReactionExist.post, {
        $inc: {
          reactionCount: -1,
        },
      })
      return res
    } else {
      isReactionExist.reaction = reaction
      await isReactionExist.save()
      return isReactionExist
    }
  }

  const result = await Reaction.create({
    user: userId,
    post: postId,
    reaction,
  })

  await Post.findByIdAndUpdate(postId, {
    $inc: {
      reactionCount: 1,
    },
  })

  return result
}

export const ReactionServices = {
  changeReactionByPostIdIntoDB,
}
