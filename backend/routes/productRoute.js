const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const Product = require('../models/productModel')

// @desc Fetch all products
// @route GET /api/products
// @access public
router.get('/' ,asyncHandler( async (req,res) => {
    //get all products
    const products = await Product.find({})
    res.json(products)
}))


// @desc Fetch single product
// @route GET /api/products/id
// @access public
router.get('/:id' ,asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
    
}))



module.exports = router