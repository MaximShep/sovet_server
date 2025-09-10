const Router = require('express')
const router = new Router()
const transactionController = require('../controller/transactions.controller.js')

router.post('/addTransaction', transactionController.addTransaction)
router.post('/getUserTransactions', transactionController.getUserTransactions)
router.post('/getUserBalance', transactionController.getUserBalance);


module.exports = router