const express = require('express')
const dotenv  = require('dotenv')
const connectDB = require('./config/db')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/usreRoute')
const errormiddelware  = require('./middelware/errorMiddelware') 
dotenv.config()

connectDB()
const app =express()

app.use(express.json())


app.get('/' ,(req,res) => {
    res.send('API is running...')
})

app.use('/api/products',productRoute)
app.use('/api/users',userRoute)

// error middelware
app.use(errormiddelware.notFound)
app.use(errormiddelware.errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))