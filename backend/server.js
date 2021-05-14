const express = require('express')
const dotenv  = require('dotenv')
const connectDB = require('./config/db')
const productRoute = require('./routes/productRoute')
const errormiddelware  = require('./middelware/errorMiddelware') 
dotenv.config()

connectDB()
const app =express()

app.get('/' ,(req,res) => {
    res.send('API is running...')
})

app.use('/api/products',productRoute)

// error middelware
app.use(errormiddelware.notFound)
app.use(errormiddelware.errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))