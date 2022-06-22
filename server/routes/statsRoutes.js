const router = require('express').Router()
const statsController = require('../controllers/statsController')
const userController =require("../controllers/userController")
// main auth routes
router.get('/earned', userController.verify, statsController.getCashEarned)
router.get('/spent', userController.verify, statsController.getCashSpent)




module.exports = router