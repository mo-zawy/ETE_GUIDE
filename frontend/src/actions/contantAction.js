import axios from 'axios'
import {
  CONTANT_ADD_FAIL,
  CONTANT_ADD_REQEST,
  CONTANT_ADD_SUCCESS,
  GET_ALL_CONTANT_FAIL,
  GET_ALL_CONTANT_REQEST,
  GET_ALL_CONTANT_RESET,
  GET_ALL_CONTANT_SUCCESS
} from '../constants/contantConstant'
import { logout } from './userAction'


export const createContant = ({name,email,about,message}) => async (dispatch) => {
  console.log('2',{name,email,about,message})
  try {
    dispatch({
      type: CONTANT_ADD_REQEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/contact`, {name,email,about,message}, config)

    dispatch({
      type: CONTANT_ADD_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CONTANT_ADD_FAIL,
      payload: message,
    })
  }
}

export const listMessages = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_CONTANT_REQEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/contact`, config)
    console.log("hi",data)
    dispatch({
      type: GET_ALL_CONTANT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: GET_ALL_CONTANT_FAIL,
      payload: message,
    })
  }
}

