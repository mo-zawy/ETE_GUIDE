const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')


// @desc Create new contact message
// @route POST /api/contact
// @access public
const newContact = asyncHandler(async (req,res) =>{
    const {
        message , 
        name, 
        about, 
        email
     } = req.body
   
        const contact = new Contact({
            name,
            message,
            about,
            email
        })
        try {
            const createdContact = await contact.save()
            res.status(201).json(createdContact)     
        } catch (error) {
            res.status(400).json({message:error.message})
        }
       
})
// @desc    Get all contact 
// @route   GET /api/contact/
// @access  Private/admin
const getAllContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({})
    res.json(contacts)
    
  })
module.exports = {
    newContact,
    getAllContact
}