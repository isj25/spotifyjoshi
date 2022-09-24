import express, { urlencoded } from 'express'
import request from 'request'
import dotenv from 'dotenv'
import qs from 'qs'
import cors from 'cors'
import axios from 'axios'
import path from 'path'

dotenv.config()
const app = express()
app.use(cors())


const __dirname = path.resolve()

app.use(express.static(path.join(__dirname,'/frontend/build')))
app.use(express.static(path.join(__dirname,'public')))



app.get("/",async (req,res)=>{

    // let token  = req.headers.authorization
    // token = token.split(' ')[1]

    // const URL = "https://api.spotify.com/v1/browse/new-releases"
    

    // try{
    //     const respdata = await axios.get(URL,{headers:{
    //         'Content-Type':'application/json',
    //         Authorization : `Bearer ${token}`
    //     }})
    
        
    
    //     res.json(respdata.data)
    // }catch(error)
    // {
    //     res.json(error)
    // }

    res.json("Server is running");

   
})



app.get("/artist:name",async (req,res)=>{


    let token = req.headers.authorization
    if(!token)
    {
        res.redirect('/')
    }
    token = token.split(' ')[1]

    let URL = "https://api.spotify.com/v1/search"
    const name = req.params.name

    URL = `${URL}?q=${name}&type=artist&limit=30`
    try{


        const respdata = await axios.get(URL,{headers:{
            'Content-Type':'application/json',
            Authorization : `Bearer ${token}`
        }})
    
        
        
        res.json(respdata.data)
    }catch(error)
    {
        res.json(error)
    }



})





app.get("/album:album",async (req,res)=>{


    let token = req.headers.authorization
    if(!token)
    {
        res.redirect('/')
    }
    token = token.split(' ')[1]

    let URL = "https://api.spotify.com/v1/search"
    const album = req.params.album

    URL = `${URL}?q=${album}&type=album&limit=30`
    try{


        const respdata = await axios.get(URL,{headers:{
            'Content-Type':'application/json',
            Authorization : `Bearer ${token}`
        }})
    
        
        
        res.json(respdata.data)
    }catch(error)
    {
        res.json(error)
    }



})



app.get("/genre:genre",async (req,res)=>{


    let token = req.headers.authorization
    if(!token || token=='undefined')
    {
        res.redirect('/')
    }
    token = token.split(' ')[1]
   
    let URL = "https://api.spotify.com/v1/search"
    const genre = req.params.genre

    URL = `${URL}?q=${genre}&type=album&limit=30`
    try{


        const respdata = await axios.get(URL,{headers:{
            'Content-Type':'application/json',
            Authorization : `Bearer ${token}`
        }})
    
        
        
        res.json(respdata.data)
    }catch(error)
    {
        res.json(error)
    }


})



app.get("/tracks:id/type:name",async(req,res)=>{

    let id = req.params.id
    id = id.substring(1)
    let name = req.params.name
    name = name.substring(1)
    let token = req.headers.authorization
    console.log(token)
    if(!token)
    {
        res.status(401)
        res.json("Invalid token")
    }
    //console.log(token)
    //console.log(typeof(token))
    token = token.split(' ')[1]


    //console.log(id)
    //console.log(name)

    if(name==='album')
    {
        name = name+'s'
    }

    let URL = `https://api.spotify.com/v1/${name}/${id}/`
  
    if(name === 'albums')
    {
            URL = URL + 'tracks'
    }else if(name === 'tracks')
    {
            URL = URL + 'tracks'
    }else if(name === 'artists')
    {
        URL = URL + 'top-tracks?market=IN'
    }
    // URL = `${URL}?q=${genre}&type=album&limit=30`
    //console.log(URL)
    try{


        const respdata = await axios.get(URL,{headers:{
            'Content-Type':'application/json',
            Authorization : `Bearer ${token}`
        }})
    
        
        
        res.json(respdata.data)
    }catch(error)
    {
        res.json(error)
    }






})


app.get("/login",async (req,res)=>{
    
    
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET
   // console.log(CLIENT_ID)
    const URL = "https://accounts.spotify.com/api/token"

    const DATA = qs.stringify({'grant_type':'client_credentials'})

    try{
        const respdata = await axios.post(URL,DATA,{headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            Authorization : 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        }})
    
        
      //  console.log(respdata.data.access_token)
   
        const token = respdata.data.access_token
       // console.log(token)
        res.json(token)
    }catch(error)
    {
        console.log(error)
        res.json(error)
    }

   









})


app.get('/recommendation/g:genre/a:artist/t:track',async (req,res)=>{
 


    let genre = req.params.genre
    let artist = req.params.artist
    let track = req.params.track
    genre = genre.substring(1)
    artist = artist.substring(1)
    track = track.substring(1)

    let token = req.headers.authorization
    if(!token)
    {
        res.redirect('/')
    }
    token = token.split(' ')[1]
    //console.log(token)
    const URL =    `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${artist}&seed_genres=${genre}&seed_tracks=${track}`
    //console.log(URL)
    try{


        const data = await axios.get(URL,{headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${token}`
        }})

        res.json(data.data)
       
    }catch(error)
    {
        //console.log(error)
        res.json(error)
    }

    


})






app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend', 'build', 'index.html'));
})

const PORT =  process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server started on Port ${PORT}`)
})