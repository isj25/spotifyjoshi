import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  return (
    <div>
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='/'> <i class="fa-brands fa-spotify"></i> SPOTIFY API TESTING </Navbar.Brand>
            </Container>
            
        </Navbar>
    </div>
  )
}

export default NavBar
