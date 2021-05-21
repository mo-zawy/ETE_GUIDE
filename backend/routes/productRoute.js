const express = require('express')
const router = express.Router()
const {
    getProductById ,
    getProducts , 
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts
} = require('../controllers/productController')
const {admin,protect} = require('../middelware/authMeddelware')

router.route('/')
            .get(getProducts)
            .post(protect,admin,createProduct)

router.get('/top',getTopProducts)
router.route('/:id/reviews').post(protect,createProductReview)

router.route('/:id')
            .get(getProductById)
            .delete(protect,admin,deleteProduct)
            .put(protect,admin,updateProduct)



module.exports = router