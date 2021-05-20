const express = require('express')
const dotenv  = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/usreRoute')
const orderRoute = require('./routes/orderRoute')
const errormiddelware  = require('./middelware/errorMiddelware') 
dotenv.config()

connectDB()
const app =express()

app.use(express.json())




app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)

// paypal ID
app.get('/api/config/paypal',(req,res)=> 
            res.send(process.env.PAYPAL_CLIENT_ID))

const dirname = path.resolve()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(dirname,'/frontend/build')))

    app.get('*',(req,res) => res.sendFile(path.resolve(dirname,'frontend','build','index.html')))
    
}else{
    app.get('/' ,(req,res) => {
        res.send('API is running...')
    })
}

// error middelware
app.use(errormiddelware.notFound)
app.use(errormiddelware.errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))