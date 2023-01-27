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

export { router }
