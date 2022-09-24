import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Table,Button } from "react-bootstrap";

const Tracks2 = () => {
  let { id} = useParams();

  id = id.substring(1);
  let name = 'artists'
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem('token'))
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [data, setData] = useState("");
  const [fetched, setFetched] = useState(false);

  

  async function fetchTracks() {
    const URL = `/tracks:${id}/type:${name}`;
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization : `Bearer ${token}`
      }
    }
    console.log(config)
    const response = await axios.get(URL, config);

    setData(response);

    //console.log(response);
    //console.log(items);
  }

  if (data === "") {
    fetchTracks();
  }

  

  useEffect(() => {
    if (fetched === false) {
      if (data !== "") {
        setFetched(true);
      }
    }
  }, [fetched, data]);
  return (
    <div className="types">
    <Button href='/' variant="warning">Go Back </Button>
    <Button href='/playlist' variant="warning" className="mx-3">Your Playlist </Button>
    <h2>Songs</h2>
      {fetched ? (
            <Table striped bordered hover>
            
               <tbody>

                {data.data.tracks.map((item,index)=>{
                    return (<tr key={index}> 
                            <td><i class="fa-solid fa-play"></i></td>
                            <td> 
                            <a style={{textDecoration:'none'}} href={item.external_urls.spotify} target='_blank' rel="noreferrer"> {item.name} </a>
                            </td>
                            <td>
                                {item.artists[0].name}
                            </td>
                            <td>
                            <Button onClick={()=>{


                              localStorage.setItem('seed_artists',item.artists[0].id)
                              localStorage.setItem('genre','country')
                              localStorage.setItem('seed_tracks',item.id)
                              
                              let playlist = localStorage.getItem('playlist')
                              let date = new Date()
                              localStorage.setItem('modified',date)
                              const newItem = item.name.toString()+'@'+item.artists[0].name.toString()
                             // console.log(newItem)
                              playlist = playlist +'#'+newItem
                              localStorage.setItem('playlist',playlist)
                              window.alert('Added to the playlist')
                            }}>Add to Playlist</Button>
                            </td>

                    
                    </tr>)
                })}
               
               </tbody>
            
            </Table>
      ) : (
        ""
      )}
    </div>
  );
};

export default Tracks2;
