import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    mobilenumber: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setUserdata(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSignup(e) {
    e.preventDefault();

    axios.post('https://ecomart-backend-2-h3fw.onrender.com/ecomart/signup', userdata)
      .then(res => {

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const newUser = {
          username: userdata.username,
          email: userdata.email,
          mobilenumber: userdata.mobilenumber
        };

        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));

        alert(`Welcome to Ecomart ${userdata.username} \nPlease Login to Enjoy your Shopping...`);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      })
      .catch(err => {
        // Handle errors properly
        if (err.response && err.response.status === 409) {
          alert("Email already exists. Please try a different one.");
        } else {
          alert('Signup failed. Please try again later.');
        }
      });
  }

  return (
    <div className='signup'>
      <div className='signup-main'>
        <div className='signupform-container'>
          <form className='signup-form' onSubmit={handleSignup}>
            <h2 className='signup-title'>EcoMart Signup</h2>
            <input type='text' placeholder='Username' id='user-field' name='username' value={userdata.username} onChange={handleChange} required /><br />
            <input type='email' placeholder='Email' id='email-field' name='email' value={userdata.email} onChange={handleChange} required /><br />
            <input type='number' placeholder='Mobile Number' id='mobilenumber-field' name='mobilenumber' value={userdata.mobilenumber} onChange={handleChange} min="0" pattern="\d{10}" title="Mobile number must be 10 digits"  required /><br />
            <input type='password' placeholder='Password' id='password-field' name='password' value={userdata.password} onChange={handleChange} required /><br />
            <button type='submit' id='signup-btn'>Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
