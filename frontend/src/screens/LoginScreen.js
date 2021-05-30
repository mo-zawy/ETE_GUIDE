import React , {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form , Button , Row , Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userAction'
import logo from '../img/aa.png'


const LoginScreen = ({location, history}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const {loading , error , userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        //Dispatch Login
        dispatch(login(email,password))
    }

    return (
        
        <>
            
            <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-6 col-md-6 d-none d-md-block image-container">

                </div>
                <div className="col-lg-6 col-md-6 form-container">
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                    <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                        <div className="logo mb-3">
                            <img  src={logo} alt="logo" width='140px'/>
                        </div>
                        <div className="heading mb-4">
                            <h4>Login into your account</h4>
                        </div>
                        <form onSubmit={submitHandler}>
                            <div className="form-input">
                                <span><i className="fa fa-envelope"></i></span>
                                <input type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email Address'
                                    name='email'
                                    required />
                            </div>
                            <div className="form-input">
                            <span><i className="fa fa-lock"></i></span>
                                <input type='password'
                                    placeholder='Password'
                                    name='password'
                                    minLength='6'
                                    value={password}
                                    onChange={(e) =>setPassword(e.target.value)}/>
                            </div>
            
                            <div className="text-left mb-3">
                                <button type='submit' className='btn'>Login</button>
                            </div>
                            
                            <div style={{color:'#3c4a53'}}>Don't have an account
                                <Link to={  redirect ? `/register?redirect=${redirect}` : '/register'} className='register-link'> Register here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            
            {/*
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Tourist ? {' '}
                    <Link to={  redirect ? 
                        `/register?redirect=${redirect}` 
                        : '/register'}
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
        */}
        </>
    )
}

export default LoginScreen
