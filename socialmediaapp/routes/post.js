import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import Post from '../models/post.js'

//create new post
router.post('/createpost', async (req, res) => {
  const { userId, description } = req.body
  try {
    const postCreated = await Post.create({ userId, description })
    console.log(postCreated)
    res.json({
      status: 'true',
      message: 'Post created ',
      data: postCreated,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//update post
router.post('/updatepost/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const post = await Post.findById(_id)
    console.log(post)
    //check userId of post is same as userId of the user who trying to update the post
    if (post.userId === req.body.userId) {
      await post.updateOne(req.body, { new: true })
      res.json({
        status: 'true',
        message: 'Post has been  updated ',
        data: post,
      })
    } else {
      res.status(403).json('Unauthorize user,You can only update your post')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//Delete post
router.delete('/deletepost/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const post = await Post.findById(_id)
    console.log(post)
    //check userId of post is same as userId of the user who trying to delete the post
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      res.json({
        status: 'true',
        message: 'Post has been  deleted ',
      })
    } else {
      res.status(403).json('Unauthorize user,You can only delete your post')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
////Get a post
router.get('/getapost/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const post = await Post.findById(_id)
    const { createdAt, updatedAt, ...others } = post._doc

    res.json({
      status: 'true',
      data: others,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get all post
router.get('/getallposts', async (req, res) => {
  try {
    const posts = await Post.find()

    res.json({
      status: 'true',
      data: posts,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//like and dislike a post

router.put('/like/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const post = await Post.findById(_id)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json({
        message: 'You liked the post!',
      })
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json({
        message: 'You disliked the post!',
      })
    }
  } catch (error) {
    res.status(500).json()
  }
})

//get a timeline

router.get('/timeline', async (req, res) => {
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
    res.json(allPosts)
  } catch (error) {
    res.status(500).json()
  }
})

export { router }
