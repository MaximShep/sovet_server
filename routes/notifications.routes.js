const Router = require('express')
const router = new Router()
const notificationsController = require('../controller/notifications.controller.js');

// Маршруты для работы с таблицей schools
router.post('/createNotification', notificationsController.createNotification);
router.get('/getUserNotifications', notificationsController.getUserNotifications);
router.put('/updateNotificationStatus', notificationsController.updateNotificationStatus);
router.delete('/deleteNotification', notificationsController.deleteNotification);


module.exports = router;