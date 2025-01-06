const Router = require('express')
const router = new Router()
const commentController = require('../controller/comments.controller.js')

router.post('/createComment', commentController.createComment)
router.get('/getCommentsByPostId', commentController.getCommentsByPostId)
router.put('/likeComment', commentController.likeComment)
router.delete('/deleteComment', commentController.deleteComment)


module.exports = router