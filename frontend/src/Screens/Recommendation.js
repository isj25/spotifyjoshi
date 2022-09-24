import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Block from '../components/Block';
import {Row,Col,Button} from 'react-bootstrap'

const Recommendation = () => {

  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem('token'))
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  const genre = localStorage.getItem('genre') || 'country'
  const seed_artists = localStorage.getItem('seed_artists') || '1wRPtKGflJrBx9BmLsSwlU'
  const seed_tracks = localStorage.getItem('seed_tracks') || '6VBhH7CyP56BXjp8VsDFPZ'


  const [ fetched,setFetched] = useState(false);
  const [data,setData] = useState('')

  async function fetch()
  {
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization : `Bearer ${token}`
      }
    }
    const URL = `/recommendation/g:${genre}/a:${seed_artists}/t:${seed_tracks}`
    const respdata  = await axios.get(URL,config)

    
    setFetched(true)
    setData(respdata)
  }


  if(!fetched)
  {
    fetch()
  }



  return (
    <div>
    <Button href='/' variant="warning" className="mx-3 my-3">Go Back </Button>
    <Button href='/playlist' variant="warning" className="mx-3 my-3">Your Playlist</Button>
        {
          fetched?(<div>
            
            <Row>
              <h2>Artists</h2>
            </Row>
            <Row className='rec-row'>
            
              {

                data.data.tracks.map((item,index)=>{

                    //console.log(item)
                  return <Col key={index}>
                    <Block name={item.artists[0].name} description={item.artists[0].type} id={item.artists[0].id} type='artists'>
                    
                    </Block>
                       
                  </Col>
  
                })


              }
            
            </Row>


            <h2>Albums</h2>
            <Row className='rec-row'>
            {
              
              data.data.tracks.map((item,index)=>{


                return <Col key={index} className='col-md-3'>
              
                      
                      <Block image={item.album.images[0].url} name={item.album.name} description={item.album.type} id={item.album.id} type={item.album.type}></Block>
                      
                </Col>

              })

            }
            </Row>
            </div>):''
        }
    </div>
  )
}

export default Recommendation
