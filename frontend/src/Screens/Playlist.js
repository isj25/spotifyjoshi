import React,{ useState} from 'react'
import {Form,Table,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const Playlist = () => {

    const navigate = useNavigate()
    const name = localStorage.getItem('playlistName') || 'My PlayList'
    const [playlistName,setPlaylistName] = useState(name) 
    let playlist = localStorage.getItem('playlist') 
    if(playlist === null)
    {
        playlist = []
    }else
    {
        playlist = playlist.split('#')
        if(playlist[0]==='null' || playlist[0]==='')
        {
            playlist.shift()
        }
    }
    
    console.log(playlist)

    localStorage.setItem('playlistName',playlistName)



    function removeHandler(name,artist)
    {
        
        let playlist = localStorage.getItem('playlist')
        let removeleft ='#'+name+'@'+artist 
        let removeright = name+'@'+artist+'#'
        if(playlist.includes(removeleft))
        {
            playlist = playlist.replace(removeleft,'')
        }else
        {
            playlist = playlist.replace(removeright,'')
        }

        localStorage.setItem('playlist',playlist)
        let date = new Date()
        localStorage.setItem('modified',date)
        navigate('/playlist')
    }

  return (
    <div>
       
    <Button href='/' variant='warning' className='my-3 mx-3'>Go Back</Button>
    <Form>
        <Form.Group  className="mb-3">
         <Form.Control type="text" size="lg" value={playlistName}  onChange={(e)=>setPlaylistName(e.target.value)} className='playlistname' placeholder='My list'/>
         </Form.Group>
    </Form>

    
   
    <Table striped bordered hover>
        <tbody>

            {
                
                playlist.map((item,index)=>{
                    
                        let arrayitem = item.split('@')
                    
                    return <tr key={index}>
                        <td> {arrayitem[0]}</td>
                        <td>{arrayitem[1]}</td>
                       
                        <td><Button onClick={()=>removeHandler(arrayitem[0],arrayitem[1])}>Remove</Button> </td>
                    </tr>
                })
            }
        </tbody>
    </Table>

    <p>Last Modified On:{localStorage.getItem('modified')}</p>

    </div>
  )
}

export default Playlist
