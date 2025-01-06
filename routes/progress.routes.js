const Router = require('express')
const router = new Router()
const progressController = require('../controller/progress.controller.js')

router.post('/addProgress', progressController.addProgress)
router.get('/getGoalProgress', progressController.getGoalProgress)
router.get('/getUserProgress', progressController.getUserProgress);
router.put('/updateProgress', progressController.updateProgress)


module.exports = router