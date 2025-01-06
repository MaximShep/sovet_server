const Router = require('express')
const router = new Router()
const commentLikesController = require('../controller/comments_likes.controller.js')

router.post('/likeComment', commentLikesController.likeComment)
router.get('/getLikesCount', commentLikesController.getLikesCount)
router.delete('/unlikeComment', commentLikesController.unlikeComment)


module.exports = router