const Router = require('express')
const router = new Router()
const storyViewsController = require('../controller/story_views.controller.js');

// Маршруты для работы с таблицей schools
router.post('/createStoryView', storyViewsController.createStoryView);
router.put('/updateStoryProgress', storyViewsController.updateStoryProgress);
router.get('/getStoryViewByUser', storyViewsController.getStoryViewByUser);
router.delete('/deleteStoryView', storyViewsController.deleteStoryView);


module.exports = router;