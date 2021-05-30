import React , {useState , useEffect} from 'react'
import { Button ,Table } from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import {createContant, listMessages} from '../actions/contantAction'
import Loader from '../components/Loader'
import { GET_ALL_CONTANT_RESET } from '../constants/contantConstant'
const ContectUsScreen = () => {
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const getAllContant = useSelector(state=>state.getAllContant)
    const {messages , loading } = getAllContant

    
    const [name,setName]=useState(userInfo ? userInfo.name : "")
    const [about,setAbout]=useState("")
    const [email,setEmail]=useState(userInfo ? userInfo.email : "")
    const [message,setmessage]=useState("")
    
    useEffect(()=>{
      if(userInfo && userInfo.isAdmin){
          dispatch(listMessages())
      }else{
          dispatch({type:GET_ALL_CONTANT_RESET})
      }
      
  },[dispatch ,userInfo])
    const SubmitHandler =(e)=>{
      e.preventDefault()
      dispatch(createContant({ name,email,about,message}))
    }
    return (
    <section className="contact-section">
      <div className = "contact-bg">
        <h2 className='text-primary'>Get in Touch with Us</h2>
        
        <div className = "line">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className= "text">
          This website is cereated to tell you about places in Egypt, get your Tekit and get a goot trip <br/>
          if you have any problem, question or suggestion don't hesitate and tell us.
        </p>
      </div>


      <div className = "contact-body">
        <div className = "contact-info">
          <div>
            <span><i className="fa fa-mobile-alt"></i></span>
            <span>Phone No.</span>
            <span className = "text">01090003178</span>
          </div>
          <div>
            <span><i className="fa fa-envelope-open"></i></span>
            <span>E-mail</span>
            <span className="text">ee.guide2.gmail.com</span>
          </div>
          <div>
            <span><i className= "fa fa-map-marker-alt"></i></span>
            <span>Address</span>
            <span className = "text">we don't have an offece untill yet</span>
          </div>
          <div>
            <span><i className="fa fa-clock"></i></span>
            <span>seeing contacts</span>
            <span className = "text">we see contacts in  Friday (9:00 AM to 12:00 PM)</span>
          </div>
        </div>
        {loading && <Loader />}
        {userInfo && userInfo.isAdmin && (
          <>
          <h1>Messages</h1>
          <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ABOUT</th>
                            <th>MESSAGE</th>
                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages && messages.map(m =>(
                            <tr key={m._id}>
                                <td>{m.name}</td>
                                <td>{m.email}</td>
                                <td>{m.about}</td>
                                <td>${m.message}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>
        )}
        <div className = "contact-form1">
        <h2>Your message: </h2>
          <form onSubmit={SubmitHandler}>
            <div>
              <input 
                type="text" 
                className="form-control1" 
                placeholder="First Name" 
                name='firstName' 
                value={name}
                onChange={e=>setName(e.target.value)}
                required />
            </div>
            <div>
              <input 
                type="text" 
                className="form-control1" 
                placeholder="Message about ? place , problem ..." 
                name='about'
                value={about}
                onChange={e=>setAbout(e.target.value)}
                required />
              <input 
                type="email" 
                className="form-control1" 
                placeholder="E-mail"
                name='email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                required />
            </div>
            <textarea 
              rows="5" 
              placeholder="Message" 
              className="form-control1"
              name='message'
              value={message}
              onChange={e=>setmessage(e.target.value)}
              required>
            </textarea>
            <Button type ="submit" className = "send-btn" onSubmit={SubmitHandler}>send message</Button>
          </form>
        </div>
      </div>
    </section>

    )
}


export default ContectUsScreen
