const router = require('express').Router()
const assetController = require('../controllers/assetController')
const userController = require('../controllers/userController')
// main auth routes
router.post('/', userController.verify, assetController.addAsset)
router.delete('/:id', userController.verify, assetController.deleteAsset)
router.put('/:id', userController.verify, assetController.editAsset)
router.post("/get", userController.verify, assetController.getAssets)



module.exports = router