import {
    CONTANT_ADD_FAIL,
    CONTANT_ADD_REQEST,
    CONTANT_ADD_SUCCESS,
    GET_ALL_CONTANT_FAIL,
    GET_ALL_CONTANT_REQEST,
    GET_ALL_CONTANT_SUCCESS,
    GET_ALL_CONTANT_RESET
} from '../constants/contantConstant'

export const ContantCreateReducer = (state ={} ,action) =>{
switch(action.type){
    case CONTANT_ADD_REQEST:
        return {
            loading:true
        }
    case CONTANT_ADD_SUCCESS:
        return {
            loading:false,
            success:true,
        }
    case CONTANT_ADD_FAIL:
        return {
            loading:false,
            error:action.payload
        }
    default:
        return state     
}
}

export const getAllContantReducer = (state ={messages:[]} ,action) =>{
    switch(action.type){
        case GET_ALL_CONTANT_REQEST:
            return {
                loading:true
            }
        case GET_ALL_CONTANT_SUCCESS:
            return {
                loading:false,
                messages:action.payload
            }
        case GET_ALL_CONTANT_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case GET_ALL_CONTANT_RESET:
            return {messages:[]}
        default:
            return state     
    }
}


