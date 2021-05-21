const express = require('express')
const router = express.Router()
const {
    authUser , 
    getUserProfile , 
    registerUser , 
    getUsers , 
    updateUserProfile, 
    deleteUser ,
    getUserByID,
    updateUser
} = require('../controllers/userController')
const {protect,admin} = require('../middelware/authMeddelware')


router.route('/').post(registerUser)
router.route('/').get(protect ,admin, getUsers)
router.post('/login',authUser)
router
    .route('/profile')
    .get(protect,getUserProfile)
    .put(protect , updateUserProfile)

router.route('/:id').delete(protect,admin,deleteUser)
                    .get(protect,admin,getUserByID)
                    .put(protect,admin,updateUser)


module.exports = router