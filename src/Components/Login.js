import React, { useState } from 'react'
import './Login.css'
import { useAuth } from './Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const auth=useAuth()
  const navigate=useNavigate()

  function handleLogin(e){
    e.preventDefault()
    axios.post('http://localhost:3001/ecomart/login',{email,password})
    .then(res=>{
      if (email === 'admin@example.com' && password==='admin') {
        auth.login({ email, role: 'admin' });
        alert('Welcome Back Admin...!');
        navigate('/admin');
      } else if (email === 'orders@gmail.com' && password === 'ecomartorders') {
        auth.login({ email, role: 'orders'});
        alert('Welcome Ready to Drive...!');
        navigate('/orders');
      } else if (res.status === 200) {
        auth.login({ email, role: 'user' });
        alert('Login Successful! Enjoy shopping...');
        navigate('/');
      }
      


    
  })
  .catch(err=>{alert('Email or Password Incorrect')})
  
}

  return (
    <div className='login'>

        <div className='login-main'>

        <div className='loginform-container'>
              <form className='login-form' onSubmit={handleLogin}>
                  <h2 className='login-title'>EcoMart Login</h2>
                  <input type='email' placeholder='Email' id='user-field' onChange={(e)=>setEmail(e.target.value)} required/><br/>
                  <input type='password' placeholder='Password' id='password-field' onChange={(e)=>setPassword(e.target.value)} required/><br/>
                  <button id='login-btn' type='submit'>Login</button>
              </form>
        </div>

        </div>

    </div>
  )
}
