import Post from '../models/post.js'
import User from '../models/user.js'
import * as dotenv from 'dotenv'
import { addImage } from '../Utilities/image.js'

dotenv.config()

const createPost = async (req) => {
  try {
    const { userId, image, description } = req.body
    let profile = null
    //base64 that is start with data then save it to profile after converting it into original data
    if (image.startsWith('data')) {
      profile = await addImage(image)
    }
    const postCreated = await Post.create({
      userId,
      image: profile,
      description,
    })
    console.log(postCreated)
    return {
      status: 'true',
      message: 'Post created ',
      data: postCreated,
    }
  } catch (err) {
    return { status: true, message: err.message }
  }
}

const updatePost = async (req, res) => {
  const _id = req.params.id
  try {
    const post = await Post.findById(_id)
    console.log(post)
    //check userId of post is same as userId of the user who trying to update the post
    if (post.userId === req.body.userId) {
      await post.updateOne(req.body, { new: true })
      return {
        status: 'true',
        message: 'Post has been  updated ',
        data: post,
      }
    } else {
      return {
        status: false,
        message: 'Unauthorize user,You can only update your post',
      }
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const deletePost = async (req) => {
  const _id = req.params.id
  try {
    const post = await Post.findById(_id)
    console.log(post)
    //check userId of post is same as userId of the user who trying to delete the post
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      return {
        status: 'true',
        message: 'Post has been  deleted ',
      }
    } else {
      return {
        status: 403,
        message: 'Unauthorize user,You can only delete your post',
      }
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const getPost = async (req) => {
  try {
    const _id = req.params.id
    const post = await Post.findById(_id)
    const { createdAt, updatedAt, ...others } = post._doc

    return {
      status: 'true',
      data: others,
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const getAllPosts = async (req) => {
  try {
    const posts = await Post.find()

    return {
      status: 'true',
      data: posts,
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const likePost = async (req) => {
  try {
    const _id = req.params.id
    const post = await Post.findById(_id)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      return {
        status: 200,
        message: 'You liked the post!',
      }
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      return {
        status: 200,
        message: 'You disliked the post!',
      }
    }
  } catch (error) {
    return { status: false, message: err.message }
  }
}

const timeline = async (req) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    //get all of your posts
    const userPosts = await Post.find({ userId: currentUser._id })
    //get posts of account you are following
    const friendsPost = await Promise.all(
      currentUser.followings.map((Id) => {
        console.log(Id)
        return Post.find({ userId: Id })
      }),
    )
    console.log(friendsPost)
    const allPosts = userPosts.concat(...friendsPost)
    return { data: allPosts }
  } catch (error) {
    return { status: false, message: err.message }
  }
}
export {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  likePost,
  timeline,
}
