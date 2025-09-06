const Router = require('express')
const router = new Router()
const schoolsController = require('../controller/schools.controller.js');

// Маршруты для работы с таблицей schools
router.post('/createSchool', schoolsController.createSchool);
router.get('/getSchools', schoolsController.getSchools);
router.post('/getSchoolById', schoolsController.getSchoolById);
router.post('/updateSchool', schoolsController.updateSchool);
router.delete('/deleteSchool', schoolsController.deleteSchool);


module.exports = router;