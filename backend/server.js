const express = require('express')
const dotenv  = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/usreRoute')
const orderRoute = require('./routes/orderRoute')
const contactRoute = require('./routes/contactRoute')
const uploadRoute = require('./routes/uploadRoute')
const errormiddelware  = require('./middelware/errorMiddelware') 
const morgan = require('morgan')
dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/contact', contactRoute)
app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//app.use(notFound)
//app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)