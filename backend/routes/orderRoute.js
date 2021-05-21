const express = require('express')
const router = express.Router()
const {
    addOrderItems ,
    getOrderById, 
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getAllOrders
} = require('../controllers/orderController')
const {protect , admin} = require('../middelware/authMeddelware')


router.route('/').post(protect,addOrderItems).get(protect,admin,getAllOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)



module.exports = router