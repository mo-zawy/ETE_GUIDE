import React , {useState} from 'react'
import {CardElement , useElements ,useStripe} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


const CARD_OPTIONS = {
    iconStyle:'solid',
    style:{
        base:{
            iconColor:'#c4f0ff',
            color:'fff',
            fontWeight:500,
            fontSize:"16px"
        },
        invalid:{
            iconColor:'#ffc7ee',
            color:'#ffc7ee'
        }
    }

}
const StripeScreen = ({orderId}) => {
    const [success , setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error , paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card:elements.getElement(CardElement)
        })
        if(!error){
            try {
                const config = {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userInfo.token}`,
                    },
                  }
                const {id} = paymentMethod
                const {data} = await axios.put(`/api/orders/${orderId}/pay`,{
                    amount:order.totalPrice,
                    id,
                    Customer:userInfo.email,
                    orderId,
                    
                },config)
                console.log(data)
                if(data){
                    console.log("successFull pay")
                    setSuccess(true)
                }
            } catch (error) {
                console.log('Error',error)
            }
        }else{
            console.log(error.message)
        }
    }
    return (
        <>
         {!success ?
            <form onSubmit={handleSubmit}>
                <fieldset className='formGroup'>
                    <div className="FormRow">
                        <CardElement/>
                    </div>
                </fieldset>
                <button className='btn btn-success py-2 m-2 '>Pay</button>
            </form>
            :
            <div>
                <h2>You just bought</h2>
            </div>
         }   
        </>
    )
}

export default StripeScreen
