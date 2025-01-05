const Router = require('express')
const router = new Router()
const postController = require('../controller/posts.controller.js')

router.post('/createPost', postController.createPost)
router.get('/getAllPosts', postController.getAllPosts)
router.get('/getPostById', postController.getPostById);
router.put('/updateLikes', postController.updateLikes)
router.delete('/deletePost', postController.deletePost)


module.exports = router