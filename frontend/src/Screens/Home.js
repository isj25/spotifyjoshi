import React,{useEffect} from "react";
import Search from "../components/Search";
import NavBar from '../components/NavBar'
import {Row,Col,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const Home = () => {
    
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  useEffect(()=>{
    if(token === null)
    {
      navigate('/login')
    }
  },[token,navigate])

 

  function clickHandler()
  {
    navigate('/playlist')
  }

  return (
    <div>
      <header className="my-3">
        <NavBar></NavBar>
      </header>

      <Row>
        <Col className="col-md-6 Col">
          <Search className="my-auto"></Search>
        </Col>
       <Col className="playlist col-md-3">
         <Button variant='warning' onClick={clickHandler}>Your Playlist</Button>
         <Button variant='warning' href="/recommendation" className="mx-3 my-3">Recommendations</Button>
       </Col>
      </Row>

      <footer className="footer">@2022 Ishwar Joshi</footer>
    </div>
  );
};

export default Home;
