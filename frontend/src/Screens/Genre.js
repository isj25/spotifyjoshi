import React,{useEffect,useState} from "react";
import {useNavigate,useParams} from 'react-router-dom'
import {Button,Row,Col} from 'react-bootstrap'
import axios from 'axios'
import Block from '../components/Block'
const Genre = () => {



    const navigate = useNavigate()
    const token = JSON.parse(sessionStorage.getItem('token'))
    useEffect(()=>{
      if(token === null)
      {
        navigate('/login')
      }
    },[token,navigate])


    let {type} = useParams()
    type = type.substring(1)
 

    const [albums,setAlbums] = useState('')
    const [dataFetched,setDataFetched]  = useState(false)

    console.log(albums.data)
    async function fetchAlbums()
    {
      const config = {
        headers:{
          'Content-Type':'application/json',
          Authorization : `Bearer ${token}`
        }
      }
        const data = await axios.get(`/genre:${type}`,config)

        setAlbums(data)
    
    }

  if(albums==='')
  {
    fetchAlbums()
  }


  useEffect(()=>{
        if(dataFetched === false)
        {
            if(albums!=='')
            {
                setDataFetched(true)
            }
        }
  },[dataFetched,albums])
   

  return (
    <div className="types">
      <Button href='/' variant="warning">Go Back </Button>
      <Button href='/playlist' variant="warning" className="mx-3">Your Playlist</Button>
      <h2>Genre</h2>
      {dataFetched?(<div>
        
        <Row>
        
        {albums.data.albums.items.map((item,index) =>{
            
            return <Col key={index}><Block name={item.name} image={item.images[0].url} description={item.album_type} id={item.id} type='albums'></Block></Col>
        })}

        </Row>
       
        
        
        
        </div>):''}
    </div>
  )
}

export default Genre
