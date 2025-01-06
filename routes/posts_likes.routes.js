const Router = require('express')
const router = new Router()
const postLikesController = require('../controller/posts_likes.controller.js')

router.post('/addPostLike', postLikesController.addPostLike)
router.get('/getPostLikes', postLikesController.getPostLikes);
router.delete('/removePostLike', postLikesController.removePostLike)


module.exports = router