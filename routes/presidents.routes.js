const Router = require('express')
const router = new Router()
const presidentController = require('../controller/presidents.controller.js')

router.post('/addPresident', presidentController.addPresident)
router.get('/getPresidentsBySchool', presidentController.getPresidentsBySchool)
router.put('/updateCurrentPresident', presidentController.updateCurrentPresident)
router.delete('/deletePresident', presidentController.deletePresident)


module.exports = router