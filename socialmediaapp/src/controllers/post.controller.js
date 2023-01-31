import * as PostService from '../services/post.service.js'
const createPost = async (req, res) => {
  const responce = await PostService.createPost(req)
  res.json(responce)
}
const updatePost = async (req, res) => {
  const responce = await PostService.updatePost(req)
  res.json(responce)
}

const deletePost = async (req, res) => {
  const responce = await PostService.deletePost(req)
  res.json(responce)
}

const getPost = async (req, res) => {
  const responce = await PostService.getPost(req)
  res.json(responce)
}

const getAllPosts = async (req, res) => {
  const responce = await PostService.getAllPosts(req)
  res.json(responce)
}
const likePost = async (req, res) => {
  const responce = await PostService.likePost(req)
  res.json(responce)
}
const timeline = async (req, res) => {
  const responce = await PostService.timeline(req)
  res.json(responce)
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
