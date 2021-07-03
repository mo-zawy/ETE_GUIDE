import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [date, setDate] = useState(Date.now())
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [shipingMethod, setShipingMethod] = useState('place')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country, phone, date, shipingMethod }))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='date'>

                    <Form.Label>Date of ticket</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter a date'
                        value={date}
                        required
                        onChange={e => setDate(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label as='legend'>Select Shipping type</Form.Label>
                    <Form.Check
                        type='radio'
                        label='in Address'
                        id='address'
                        name='shipingMethod'
                        value='address'
                        onChange={(e) => setShipingMethod(e.target.value)}
                    >
                    </Form.Check>

                    <Form.Check
                        type='radio'
                        label='in Place'
                        id='place'
                        name='shipingMethod'
                        value='place'
                        checked={shipingMethod === 'place'}
                        onChange={(e) => setShipingMethod(e.target.value)}
                    >
                    </Form.Check>
                    {console.log(shipingMethod)}
                </Form.Group>
                <Form.Group controlId='phone'>
                    <Form.Label>whatsapp or telegram</Form.Label>
                    <Form.Control
                        type='tel'
                        placeholder='Enter a phone number'
                        value={phone}
                        required
                        onChange={e => setPhone(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Address'
                        value={address}
                        required
                        onChange={e => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your City'
                        value={city}
                        required
                        onChange={e => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Postal Code'
                        value={postalCode}
                        required
                        onChange={e => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Country'
                        value={country}
                        required
                        onChange={e => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
