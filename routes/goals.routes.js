const Router = require('express')
const router = new Router()
const goalController = require('../controller/goals.controller.js')

router.post('/addGoal', goalController.addGoal)
router.post('/getSchoolGeneralGoals', goalController.getSchoolGeneralGoals)
router.post('/getSchoolPersonalGoals', goalController.getSchoolPersonalGoals);
router.get('/getSystemGoals', goalController.getSystemGoals);
router.put('/updateCurrentAmount', goalController.updateCurrentAmount)
router.delete('/deleteGoal', goalController.deleteGoal)


module.exports = router