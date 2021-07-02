import React, { useState , useEffect } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { listProductDetails } from '../actions/productAction'

const ProductDescription = ({match}) => {
    const productDetails = useSelector(state => state.productDetails)
    const {loading ,error,product} = productDetails
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
          
    },[dispatch,match.params.id])
    return (
        <div className='row'>
            <div className='col-md-6 col-sm-12'>
                {product && product.description && <div>{product.description}</div>}
            </div>
            <div  className='col-md-6 col-sm-12'>
                {product && product.descriptionAr && <div style={{direction:'ltr'}}>{product.descriptionAr}</div>}
            </div>
        </div>
    )
}

export default ProductDescription
