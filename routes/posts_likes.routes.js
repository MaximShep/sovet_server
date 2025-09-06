const Router = require('express')
const router = new Router()
const postLikesController = require('../controller/posts_likes.controller.js')

router.post('/changeLike', postLikesController.changeLike)
router.post('/checkLike', postLikesController.checkLike)

router.post('/getPostLikes', postLikesController.getPostLikes);


module.exports = router