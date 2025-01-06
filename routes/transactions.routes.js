const Router = require('express')
const router = new Router()
const transactionController = require('../controller/transactions.controller.js')

router.post('/addTransaction', transactionController.addTransaction)
router.get('/getUserTransactions', transactionController.getUserTransactions)
router.get('/getUserBalance', transactionController.getUserBalance);


module.exports = router