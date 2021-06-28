import React , { useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button , Row ,Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
        listProducts , 
        deleteProduct ,
        createProduct
    } from '../actions/productAction'
import {PRODUCT_CREATE_RESET} from '../constants/productConstant'

const ProductListScreen = ({history , match}) => {
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading , error , products,page,pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete , error:erorrDelete , success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate , error:erorrCreate , success:successCreate ,product:createdProduct} = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    
    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }
        else{
            dispatch(listProducts('',pageNumber))
        }
    },[
        dispatch ,
        history,
        userInfo ,
        successCreate ,
        pageNumber ,
        createdProduct,
        successDelete,
    ])
   
    const createProductHandler = () =>{
        // create product
        dispatch(createProduct())
    }
    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure')){
            //delete products
            dispatch(deleteProduct(id))
        }
        
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Places</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                       <i className='fas fa-plus'></i> Create Place
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {erorrDelete && <Message variant='danger'>{erorrDelete}</Message>}
            {loadingCreate && <Loader/>}
            {erorrCreate && <Message variant='danger'>{erorrCreate}</Message>}
            
            {loading? <Loader /> :error ? <Message variant='danger'>{error}</Message>:(
                <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>TYPE</th>
                            <th>LOCATION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price} EGP</td>
                                <td>{product.type}</td>
                                <td>{product.location}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                           <i className='fas fa-edit'></i> 
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={()=>
                                        deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>    
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate page={page} pages={pages} isAdmin={true} />
                </>
            )}   
        </>
    )
}

export default ProductListScreen
