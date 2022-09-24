import React from 'react'
import {useState} from 'react'
import {Form, FormGroup,FormControl,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function Search() {


  const navigate = useNavigate()

  const [searchType,setSearchType] = useState('album')
  const [search,setSearch] = useState('')

  function submitHandler(event)
  {
      event.preventDefault()
      navigate(`/${searchType}:${search}`);
  }





  return (
    <div >
           <Form className='mx-3' onSubmit={submitHandler}>
            <FormGroup controlId="text">
              <h2>Search Box</h2>
                <select name='type' onChange={(e)=>setSearchType(e.target.value)}>
                    <option value='album'>Album/Songs</option>
                    <option value='artist'>Artist</option>
                    <option value='genre'>Genre</option>
                </select>

         
                <FormControl
                    type="text"
                
                    placeholder="Enter Your search"
                    required
                    className='my-3'
                    onChange={(e)=>setSearch(e.target.value)}
                ></FormControl>
            </FormGroup>
            <Button type='submit' className='btn-lg btn-primary'> Search </Button>
           </Form>
    </div>
  )
}

export default Search
