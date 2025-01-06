const Router = require('express')
const router = new Router()
const projectController = require('../controller/projects.controller.js')

router.post('/addProject', projectController.addProject)
router.get('/getProjectsBySchoolWithAuthor', projectController.getProjectsBySchoolWithAuthor)
router.get('/getProjectsBySchoolWithoutAuthor', projectController.getProjectsBySchoolWithoutAuthor);
router.put('/updateProject', projectController.updateProject)
router.delete('/deleteProject', projectController.deleteProject)


module.exports = router