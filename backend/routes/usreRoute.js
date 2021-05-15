const express = require('express')
const router = express.Router()
const {authUser , getUserProfile , registerUser , updateUserProfile} = require('../controllers/userController')
const protect = require('../middelware/authMeddelware')


router.route('/').post(registerUser)
router.post('/login',authUser)
router
    .route('/profile')
    .get(protect,getUserProfile)
    .put(protect , updateUserProfile)




module.exports = router