import React from 'react'
import {Route,Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {Nav , Navbar , Container, NavDropdown, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userAction'
import SearshBox from './SearshBox'
const Header1 = () => {
    const dispatch = useDispatch()
   
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    
    const logoutHandler = () =>{
        dispatch(logout())
    }
    return (
        <>
        <div className="bg-top navbar-light">
    	    <div className="container">
                
                <div className="row no-gutters d-flex align-items-center align-items-stretch">
                    <div className="col-md-4 d-flex align-items-center py-4">
                        <Link className="navbar-brand" to="/">EE-GUIDE</Link>
                    </div>
                    <div className="col-lg-8 d-block">
                        <div className="row d-flex">
                            <div className="col-md d-flex topper align-items-center align-items-stretch py-md-4">
                                <div className="icon d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
                                <div className="text">
                                    <span>Email</span>
                                    <span>ee.guide2@email.com</span>
                                </div>
                            </div>
                            <div className="col-md d-flex topper align-items-center align-items-stretch py-md-4">
                                <div className="icon d-flex justify-content-center align-items-center"><span className="icon-phone2"></span></div>
                                <div className="text">
                                    <span>Call</span>
                                    <span>Call Us: +02 01090003178</span>
                                </div>
                            </div>
                            <div className="col-md topper d-flex align-items-center justify-content-end">
                                <p className="mb-0">
                                    {userInfo ? (
                                        <Link to="/profile" className="btn py-2 px-3 btn-primary d-flex align-items-center justify-content-center">
                                            <span>Profile</span>
                                        </Link>
                                    ):(
                                        <Link to="/login" className="btn py-2 px-3 btn-primary d-flex align-items-center justify-content-center">
                                            <span>Sign In</span>
                                        </Link>
                                        
                                    )}
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div> 
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div className="container d-flex align-items-center px-4">
        <Navbar expand="lg" collapseOnSelect>
		<Navbar.Toggle aria-controls="ftco-nav" data-target="#ftco-nav" aria-expanded="false" aria-label="Toggle navigation" data-toggle="collapse" className="navbar-toggler" />		
	        <Route render={({history})=> <SearshBox history={history} />} />
            <Navbar.Collapse id="ftco-nav" className="collapse navbar-collapse">
	        <ul className="navbar-nav mr-auto">
	        	<li className="nav-item active"><Link to="/" className="nav-link pl-0">Home</Link></li>
	        	<li className="nav-item">
                    <Link to="/cart" className="nav-link">
                        Cart
                    </Link>
                </li>
	        	
	        	
	        	{userInfo &&(   <>
                            <li className="nav-item"><Link className="nav-link" onClick={logoutHandler}>Logout</Link></li>
                        </>
                    )}
                    {userInfo && userInfo.isAdmin &&(
                                <>
                                    <li className="nav-item"><Link to="/admin/userlist" className="nav-link">Users</Link></li>
                                    <li className="nav-item"><Link to="/admin/productlist" className="nav-link">Products</Link></li>
                                    <li className="nav-item"><Link to="/admin/orderlist" className="nav-link">Orders</Link></li>
                                </>

                                
                    )}
                
	          
	        </ul>
          </Navbar.Collapse>
          </Navbar>
	    </div>
	  </nav> 
        </>
    )
}

export default Header1
