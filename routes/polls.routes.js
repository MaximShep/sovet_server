const Router = require('express')
const router = new Router()
const pollsController = require('../controller/polls.controller.js');

// Маршруты для работы с таблицей schools
router.post('/createPoll', pollsController.createPoll);
router.get('/getActivePolls', pollsController.getActivePolls);
router.get('/getPollById', pollsController.getPollById);
router.put('/incrementPollCount', pollsController.incrementPollCount);
router.delete('/deletePoll', pollsController.deletePoll);


module.exports = router;