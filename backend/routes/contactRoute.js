const express = require('express')
const router = express.Router()
const {
    getAllContact,
    newContact
} = require('../controllers/contactController')

const {protect, admin} = require('../middelware/authMeddelware')


router.route('/').get(protect,admin,getAllContact).post(newContact)

module.exports = router