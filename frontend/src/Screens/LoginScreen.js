import React from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const LoginScreen = () => {

    const navigate = useNavigate()

    localStorage.setItem('playlist','')
    async function loginHandler()
    {
            const URL = "/login"
            const data = await axios.get(URL)
            
            if(data.status ===200)
            {
                    sessionStorage.setItem('token',JSON.stringify(data.data))
                  
                    navigate('/')
            }else
            {
                navigate('/login')
            }
    }


  return (
    <div className='login'>   
        <h3>User Must login to get Token from spotify </h3>
        <Button onClick={loginHandler} className='btn-lg btn-block'>Login</Button>
    </div>
  )
}

export default LoginScreen
