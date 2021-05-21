const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async (req,res,next) =>{
    let token = req.headers.authorization
    if( req.headers.authorization &&
        token.startsWith('Bearer'))
    {
        try {
            token = token.split(' ')[1]
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            
            next()
            
        } catch (error) {
            //console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    
})

const admin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not Authorized as an admin')
    }
}

module.exports = {protect , admin}