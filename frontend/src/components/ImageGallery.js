import React, { useState , useEffect } from 'react'
import {useDispatch , useSelector} from 'react-redux'

import { listProductDetails } from '../actions/productAction'

const ImageGallery = ({match}) => {

    const [model,setModel] = useState(false)
    const [tempImgSrc,setTempImgSrc] = useState('') 
    const getImage = (imgSrc) =>{
        console.log('aaa')
        setTempImgSrc(imgSrc)
        setModel(true)
    }
    const colseModel = ()=>{
        setModel(false)
        setTempImgSrc('')
    }
    const productDetails = useSelector(state => state.productDetails)
    const {loading ,error,product} = productDetails
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
          
    },[dispatch,match.params.id])
    return (
        <>
        
            <div className={model ? 'model open':'model'}>
                <img src={tempImgSrc} />
                <button type="button" className="btn close svg" aria-label="Close" onClick={()=>colseModel()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="gallery mt-3">
                {product && product.images && product.images.length > 0 && product.images.map((item,index)=>{
                    return(
                        <div className="pics" key={index} onClick={()=>getImage(item)}>
                            <img src={item} style={{width:"100%"}} />
                        </div>
                    )
                })}
            </div>   
        </>
    )
}

export default ImageGallery
