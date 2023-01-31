import express from 'express'
const router = express.Router()
import * as PostController from '../controllers/post.controller.js'
import { verifyAuthToken } from '../Utilities/authentication.js'

router.post('/createpost', verifyAuthToken(), PostController.createPost)
router.post('/updatepost/:id', verifyAuthToken(), PostController.updatePost)
router.delete('/deletepost/:id', verifyAuthToken(), PostController.deletePost)
router.get('/getapost/:id', verifyAuthToken(), PostController.getPost)
router.get('/getallposts', verifyAuthToken(), PostController.getAllPosts)
//like and dislike a post
router.put('/like/:id', verifyAuthToken(), PostController.likePost)
//get a timeline's post of particular user
router.get('/timeline', verifyAuthToken(), PostController.timeline)

export { router }
