import React , {useState} from 'react'
import {Elements,CardElement , useElements ,useStripe} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'


import StripeScreen from '../screens/StripeScreen'

const PUBLIC_KEY = "pk_test_51IwqsYIsN334w0iAAblYi5IkPZ0tbxgq6kFu1WuOeVfOaxKkXH8uNxmtnCQ3cnzAMGfbnuOkuhJh5iYQ5O3JVKix003v64Ex19"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripePayment = ({orderId}) => {
    return (
        <Elements stripe={stripeTestPromise}>
            <StripeScreen orderId ={orderId} />
        </Elements>
    )
}

export default StripePayment
