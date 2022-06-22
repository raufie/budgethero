const router = require('express').Router()
const userController = require('../controllers/userController')

// main auth routes
router.post('/', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/verify',userController.verify, userController.verifyLogin)




module.exports = router