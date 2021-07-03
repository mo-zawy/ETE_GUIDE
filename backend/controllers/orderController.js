const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')

require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

// @desc Create new order
// @route POST /api/orders
// @access priate
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not Found')
  }
})


// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {


  let { amount, id, Customer } = req.body

  const order = await Order.findById(req.params.id)
  if (order) {
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: Customer,
        payment_method: id,
        confirm: true,
      })
      console.log('payment ', payment)
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: Customer,
      }
      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } catch (error) {
      console.log("Error", error)
      res.json({
        message: 'Fail',
        success: false
      })
    }

  } else {
    res.status(404)
    throw new Error('Order not found')
  }




})

// @desc    Update order to Delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    GET logged in user orders 
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)

})

// @desc    Get all orders 
// @route   GET /api/orders/
// @access  Private/admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)

})

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders
}