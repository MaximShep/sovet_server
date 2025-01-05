const Router = require('express')
const router = new Router()
const storiesController = require('../controller/stories.controller.js');

// Маршруты для работы с таблицей schools
router.post('/createStory', storiesController.createStory);
router.get('/getActiveStories', storiesController.getActiveStories);
router.get('/getStoryById', storiesController.getStoryById);
router.delete('/deleteStory', storiesController.deleteStory);


module.exports = router;