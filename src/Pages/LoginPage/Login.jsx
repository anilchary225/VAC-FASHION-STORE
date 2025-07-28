import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Login.css';

function Login() {
        const [userName, setUserName]=useState('')
        const [password,setPassword]=useState('')
        const navigate = useNavigate();
        const handleSubmit=(e)=>{
                e.preventDefault()
                const storedUser = JSON.parse(localStorage.getItem('user'))
                if (storedUser && storedUser.userName === userName && storedUser.password === password) {
                        localStorage.setItem('isLoggedIn', true);
                        alert('Login successful');
                        navigate('/');
                      } else {
                        alert('Invalid username or password');
                      }
        }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
    <div className='d-flex justify-content-center align-items-center ' style={{height:'500px',width:'60%',border:'1px solid gray',borderRadius:'10px'}}>
        <div className='d-flex justify-content-center align-items-center flex-column' style={{width:'40%',margin:'auto',fontFamily:'copperplate'}}>
        <p>Welcome to</p>
        <img src='/VACLOGO.png' alt="VAC Logo" style={{width: '400px',margin:'10px',marginRight:'20px'}} />


        </div>
        <div className='d-flex justify-content-center align-items-center flex-column' style={{width:'45%',margin:'auto',height:'100%'}}>
                <form onSubmit={handleSubmit} className='form-control d-flex flex-column justify-content-center align-items-center 'style={{width:'100%',height:'80%'}} action="">
                        <h1 className='text-center mb-3' style={{fontFamily:'copperplate'}}>Login</h1>
                        <div className='d-flex  flex-column gap-3 w-100'>
                                <p className='m-0 p-0'>Username:</p>
                                <input type="text" placeholder='Enter Your Username' value={userName} onChange={(e)=>setUserName(e.target.value)} className='form-control' />
                                <p className='m-0 p-0'>Password:</p>
                                <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' />
                                <button type="submit"  className='btn btn-primary mt-2 w-100'>Login</button>
                        </div>
                        <p className='text-center mt-2'>You don’t have an account. <Link to="/register" style={{textDecoration:'none'}}>Register</Link></p>
                        <p className='text-center mt-2'>Forgot Password? <Link to="/register" style={{textDecoration:'none'}}>Click Here</Link></p>

                </form>
        </div>
    </div>
</div>
  )
}

export default Login
