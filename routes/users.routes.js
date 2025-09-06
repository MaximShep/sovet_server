const Router = require('express')
const router = new Router()
const userController = require('../controller/users.controller.js')

router.post('/createUser', userController.createUser)
router.get('/getUserById', userController.getUserById)
router.post('/getUserByLogin', userController.getUserByLogin)
router.get('/getAllUsers', userController.getAllUsers);
router.put('/updateUser', userController.updateUser)
router.delete('/deleteUser', userController.deleteUser)


module.exports = router