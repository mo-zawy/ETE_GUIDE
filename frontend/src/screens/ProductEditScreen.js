import React , {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form , Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails , updateProduct} from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'


const ProductEditScreen = ({match ,  history}) => {
    const productId = match.params.id 

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [location,setlocation] = useState('')
    const [description,setDescription] = useState('')
    const [type,settype] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [uploading,setUploading] = useState(false)
    const [governorate,setGovernorate] = useState('')
    const [timeRegion,setTimeRegion] = useState('')
    const [images,setImages] = useState([])

    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading , error , product} = productDetails
    
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate , error:errorUpdate , success:successUpdate} = productUpdate


    const addImages = (e)=>{
        const a = e.target.files
        const z = Array.from(a)

        z.forEach(i => images.push(i))
        console.log('images' , images)
    }
    const imagesHandler = async (e) =>{
        e.preventDefault()
        var formData = new FormData()
        for(let i = 0; i<images.length ; i++ ){
            formData.append('images',images[i])
        }
        const config ={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        axios.post(`/api/upload-images/${product._id}`, formData,config).then((a)=>{
            console.log('aa',a)
        })
       
    }


    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setlocation(product.location)
                setDescription(product.description)
                settype(product.type)
                setGovernorate(product.governorate)
                setCountInStock(product.countInStock)
                setTimeRegion(product.timeRegion)
            }
        }
        
    
        
    },[dispatch,product,productId ,history , successUpdate])

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const config ={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload',formData,config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    
    const submitHandler = (e) =>{
        e.preventDefault()
        // update product
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            location,
            type,
            description,
            countInStock,
            image,
            governorate,
            timeRegion
        }))
           
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
                <>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Your product Name'
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Enter Price value'
                            value={price}
                            onChange={e=>setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter image URL'
                            value={image}
                            onChange={e=>setImage(e.target.value)}
                        >
                        </Form.Control>
                        <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}>

                        </Form.File>
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='location'>
                        <Form.Label>location</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter place location'
                            value={location}
                            onChange={e=>setlocation(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='type'>
                        <Form.Label>type</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Place type'
                            value={type}
                            onChange={e=>settype(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Place Description'
                            value={description}
                            onChange={e=>setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='governorate'>
                        <Form.Label>Governorate</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Place Governorate'
                            value={governorate}
                            onChange={e=>setGovernorate(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='timeRegion'>
                        <Form.Label>Time Region</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Place Time Region'
                            value={timeRegion}
                            onChange={e=>setTimeRegion(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Enter Place Number of Tackets'
                            value={countInStock}
                            onChange={e=>setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update Place
                    </Button>
                </Form>
                <Form onSubmit={(e)=>imagesHandler(e)}>
                    <Form.Group controlId='images'>
                        <Form.Label>Images</Form.Label>
                        <Form.File id='images-file' label='Choose File' custom max='8' onChange={(e)=>addImages(e)} multiple>
                        </Form.File>
                        
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Add images
                    </Button>
                </Form>
                </>
                )}
                
                
            </FormContainer>
        </>
        
    )
}

export default ProductEditScreen
