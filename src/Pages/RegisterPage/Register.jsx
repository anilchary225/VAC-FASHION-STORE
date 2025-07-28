import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { name, userName, phone, email, password, confirmPassword } = formData;
    const setName = (value) => setFormData({ ...formData, name: value });
    const setUsername = (value) => setFormData({ ...formData, userName: value });
    const setPhone = (value) => setFormData({ ...formData, phone: value });
    const setEmail = (value) => setFormData({ ...formData, email: value });
    const setPassword = (value) => setFormData({ ...formData, password: value });
    const setConfirmedPassword = (value) => setFormData({ ...formData, confirmPassword: value });
    
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log(formData);
        const user = {
            name,
            userName,
            phone,
            email,
            password
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', true);
        alert('Registration successful');
        navigate('/');
    }
    


return (
    <div className='d-flex justify-content-center align-items-center ' style={{height:'100vh'}}>
        <div className='d-flex justify-content-center align-items-center ' style={{height:'800px',width:'60%',border:'1px solid gray',borderRadius:'10px'}}>
            <div className='d-flex justify-content-center align-items-center flex-column' style={{width:'40%',margin:'auto',fontFamily:'copperplate'}}>
            <p>Welcome to</p>
            <img src='/VACLOGO.png' alt="VAC Logo" style={{width: '400px',margin:'10px',marginRight:'20px'}} />


            </div>
            <div className='d-flex justify-content-center align-items-center flex-column' style={{width:'45%',margin:'auto',height:'100%'}}>
                    <form onSubmit={handleSubmit} className='form-control'style={{width:'100%',height:'95%'}} action="">
                            <h3 className='text-center mb-3' style={{fontFamily:'copperplate'}}>Create your account</h3>
                            <div className='d-flex flex-column gap-3'>
                                    <p className='m-0 p-0'>Name:</p>
                                    <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} className='form-control' />
                                    <p className='m-0 p-0'>User Name:</p>
                                    <input type="text" placeholder='Enter Username' value={userName} onChange={(e)=>setUsername(e.target.value)} className='form-control' />
                                    <p className='m-0 p-0'>Phone Number:</p>
                                    <input type="text" placeholder='Enter Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} className='form-control' />  
                                    <p className='m-0 p-0'>Email:</p>
                                    <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' />
                                    <p className='m-0 p-0'>Password:</p>
                                    <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' />
                                    <p className='m-0 p-0'>Confirm Password:</p>
                                    <input type="password" placeholder='Confirm Password'  value={confirmPassword} onChange={(e)=>setConfirmedPassword(e.target.value)} className='form-control' />
                                    <button type="submit" className='btn btn-primary mt-2 w-100'>Register</button>
                            </div>
                            <p className='text-center mt-2'>Already have an account? <Link to="/login" style={{textDecoration:'none'}}>Login</Link></p>

                    </form>
            </div>
        </div>
    </div>
)
}

export default Register
