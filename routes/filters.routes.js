const Router = require('express')
const router = new Router()
const filtersController = require('../controller/filters.controller.js');

// Маршруты для работы с таблицей schools
router.post('/createFilter', filtersController.createFilter);
router.get('/getAllFilters', filtersController.getAllFilters);
router.delete('/deleteFilter', filtersController.deleteFilter);


module.exports = router;