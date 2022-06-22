const router = require('express').Router()
const expenseController = require('../controllers/expenseController')
const userController = require('../controllers/userController')
// main auth routes
router.post('/', userController.verify, expenseController.addExpense)
router.delete('/:id', userController.verify, expenseController.deleteExpense)
router.put('/:id', userController.verify, expenseController.editExpense)
router.post("/get", userController.verify, expenseController.getExpenses)


module.exports = router