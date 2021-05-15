import {createStore , combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    productListReducer , 
    productDetailsReducer
} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer
} from './reducers/userReducer'
import {oredrCreateReducer} from './reducers/orderReducer'

const reducer = combineReducers({
    productList : productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:oredrCreateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const shippingAdressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {}

const initialState = {
    cart: { cartItems:cartItemsFromStorage , shippingAddress:shippingAdressFromStorage },
    userLogin:{ userInfo:userInfoFromStorage },

}

const middleware = [thunk]

const store = createStore(
    reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store