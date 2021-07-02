import React , {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form , Button , Row , Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userAction'
import logo from '../img/aa.png'


const RegisterScreen = ({location, history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const {loading , error , userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        console.log(userInfo)
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password))
        }
        //Dispatch Register   
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-6 col-md-6 d-none d-md-block image-container">

                </div>
                <div className="col-lg-6 col-md-6 form-container">
                    <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                        {/*<div className="logo mb-3">
                            <img src={logo}  alt="logo" width='140px'/>
                        </div>*/}
                        <div className="heading mb-4">
                            <h4>Craete an account</h4>
                        </div>
                        {error && <Message variant="danger">may have a problem in email or password</Message>}
                        {message && <Message variant="danger">{message}</Message>}
                        {loading && <Loader />}
                        <form onSubmit={submitHandler}>
                            <div className="form-input">
                                <span><i className="fa fa-user"></i></span>
                                <input type='text'
                                    placeholder='Your Name'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required/>
                            </div>
                            <div className="form-input">
                                <span><i className="fa fa-envelope"></i></span>
                                <input type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email Address'
                                    name='email'
                                    required/>
                            </div>
                            <div className="form-input">
                            <span><i className="fa fa-lock"></i></span>
                                <input type='password'
                                    placeholder='Password'
                                    name='password'
                                    minLength='6'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="form-input">
                            <span><i className="fa fa-lock"></i></span>
                                <input type='password'
                                    placeholder='Confirm Password'
                                    name='password2'
                                    minLength='6'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            
                            <div className="text-left mb-3">
                                <button type='submit' className='btn'>Register</button>
                            </div>
                            
                            <div style={{color:'#3c4a53'}}>Already have an account
                                <Link to={  redirect ? 
                        `/login?redirect=${redirect}` 
                        : '/login'} className='login-link'> Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        /*
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
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

                <Form.Group controlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account ? {' '}
                    <Link to={  redirect ? 
                        `/login?redirect=${redirect}` 
                        : '/login'}
                    >
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
        */
    )
}

export default RegisterScreen
