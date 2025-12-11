import React, { useEffect, useState } from 'react'

import logo from '../Components/assets/logo.png'
import search from '../Components/assets/search.png'
import user from '../Components/assets/user.png'
import { NavLink } from 'react-router-dom'
import Profilepopup from './Profilepopup'
import axios from 'axios'


import Mobilemenu from '../Components/assets/mobilemenu.png'
import { useAuth } from './Auth'

export default function Navbar() {

  const[popup,setPopup]=useState(false)

  const[toggle,setToggle]=useState(false) // Mobile Menubar

  const auth=useAuth()

  const [hasOffers, setHasOffers] = useState(false);
  useEffect(() => {
  axios.get("http://localhost:3001/ecomart/getoffers")
    .then(res => {
      if (res.data && res.data.length > 0) {
        setHasOffers(true);
      } else {
        setHasOffers(false);
      }
    })
    .catch(err => console.log(err));
}, []);


// For Popup Profile
  function profile(){     
    setPopup(true)
  }


  

  return (
    <div className='navbar-container'>

<header className='navheader'>

    <div className='nav-headertop'>
    <div className='logo-name'>
    <img src={logo} className='mainlogo'/>
    <h2 className='martname'>EcoMart</h2>
    </div>

    {/* -----------------Mobile user Btn------------------ */}
    <div className='mobile-user-menu'>
    <button className='mobile-userbtn' onClick={profile}><img src={user} className='user-logo'/></button> 
    <button className='mobile-menubtn' onClick={()=>setToggle(!toggle)}><img src={Mobilemenu} className='mobile-menuimg'/></button>
    </div>
    {/* -------------------------------------------------- */}

    
    <div className='nav-searchbar'></div>
    <button className='user-btn' onClick={profile}><img src={user} className='user-logo'/></button> 
  </div>



<div className='nav-headerbottom'>
    <button className='dept-button'>All Department</button>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/products'>Products</NavLink>
    <NavLink to='/cart'>Cart</NavLink>
    {hasOffers && <NavLink to='/offers' id='offers'>Special Offers</NavLink>}
    <NavLink to='/about'>About</NavLink>
    <NavLink to='/contact'>Contact</NavLink>
    {auth.user?.email === "admin@example.com" && <NavLink to='/admin'>Admin</NavLink>}
    {auth.user?.email === "orders@gmail.com" && <NavLink to='/orders'>Orders</NavLink>}
    {auth.user &&  <NavLink to='/account'>Account</NavLink>}
    {!auth.user && <NavLink to='/login'>Login</NavLink>}
    {!auth.user && <NavLink to='/signup'>Signup</NavLink>}
</div>

</header><hr></hr>
      {popup && <Profilepopup setPopup={setPopup}/> }



      {/* Mobile navlinks */}

    {toggle && (
  <div className="mobile-menu-overlay">
    <div className="mobile-navbar animated-navbar">
      <NavLink to="/" onClick={() => setToggle(false)} className="navlink">Home</NavLink>
      <NavLink to="/products" onClick={() => setToggle(false)} className="navlink">Products</NavLink>
      <NavLink to="/cart" onClick={() => setToggle(false)} className="navlink">Cart</NavLink>
      {hasOffers && <NavLink to='/offers' id='offers'>Special Offers</NavLink>}
      <NavLink to="/about" onClick={() => setToggle(false)} className="navlink">About</NavLink>
      <NavLink to="/contact" onClick={() => setToggle(false)} className="navlink">Contact</NavLink>
      {auth.user?.email === "orders@gmail.com" && (
        <NavLink to="/orders" onClick={() => setToggle(false)} className="navlink">Orders</NavLink>
      )}
      {auth.user && <NavLink to="/account" onClick={() => setToggle(false)} className="navlink">Account</NavLink>}
      {!auth.user && <NavLink to="/login" onClick={() => setToggle(false)} className="navlink">Login</NavLink>}
      {!auth.user && <NavLink to="/signup" onClick={() => setToggle(false)} className="navlink">Signup</NavLink>}
    </div>
  </div>
)}


    </div>
  )
}


