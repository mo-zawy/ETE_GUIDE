import {createStore , combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    productListReducer , 
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer
} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducer'
import {
        oredrCreateReducer,
        oredrDetailsReducer,
        oredrPayReducer,
        oredrDeliverReducer,
        oredrListMyReducer,
        oredrListReducer
} from './reducers/orderReducer'

const reducer = combineReducers({
    productList : productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productReviewCreate:productReviewCreateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:oredrCreateReducer,
    orderDetails:oredrDetailsReducer,
    orderPay:oredrPayReducer,
    orderDeliver:oredrDeliverReducer,
    orderListMy:oredrListMyReducer,
    orderList:oredrListReducer
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