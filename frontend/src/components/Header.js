import React from 'react'
import {Nav , Navbar , Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>EE-Guide</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/card'>
                                <Nav.Link><i className='fas fa-shopping-cart'></i>{' '}Card</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'></i>{' '}Sign In</Nav.Link>
                            </LinkContainer>
                            
                        
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
