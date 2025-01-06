const Router = require('express')
const router = new Router()
const graduateController = require('../controller/graduates.controller.js')

router.post('/addGraduate', graduateController.addGraduate)
router.get('/getGraduatesBySchool', graduateController.getGraduatesBySchool)
router.delete('/deleteGraduate', graduateController.deleteGraduate)


module.exports = router