const Router = require('express')
const router = new Router()
const pollResponsesController = require('../controller/poll_responses.controller.js')

router.post('/createPollResponse', pollResponsesController.createPollResponse)
router.get('/checkPollResponse', pollResponsesController.checkPollResponse)
router.delete('/deletePollResponse', pollResponsesController.deletePollResponse)


module.exports = router