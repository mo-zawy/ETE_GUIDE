import React , {useState} from 'react'
import {Form , Button} from 'react-bootstrap'

const SearshBox = ({history}) => {
    const [keyword,setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
    return (
        
        <form onSubmit={submitHandler} className="searchform order-lg-last">
          <div className="form-group d-flex">
            <input type="text" className="form-control pl-3" onChange={(e)=>setKeyword(e.target.value)} placeholder="Search" />
            <button type="submit" placeholder="" className="form-control search"><span className="fas fa-search"></span></button>
          </div>
        </form>
        
    )
}

export default SearshBox
