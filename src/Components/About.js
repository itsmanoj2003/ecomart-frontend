import React from 'react'



import './About.css'

import Aboutimg1 from '../Components/assets/abouimg.jpg'
import Aboutimg2 from '../Components/assets/aboutimg.jpg'

export default function About() {
  return (
    <div>
        <div className='about'>

        <div className='about-main'>

          <div className='aboutimg1-container'>
                <img src={Aboutimg1} className='aboutimg1'/>
            </div>

            <div className='about-contentmain'>
              <div className='about-content'>
              <h1 className='about-title'>EcoMart</h1>
              <p className='about-desc1'>
              Welcome to EcoMart, your go-to destination for all your supermarket needs! At EcoMart, we are committed to providing a wide range of high-quality products while ensuring a convenient and seamless shopping experience.
              </p><br/><br/>
              <p className='about-desc2'>Our mission is to make shopping efficient, affordable, and eco-friendly by providing sustainable packaging options and reducing waste. Whether you're stocking up on daily essentials or looking for specialty products, EcoMart is here to serve you with quality, variety, and value.</p><br/><br/>

              <label className='slogan'>Save Money Save Time !</label>
              </div>
            </div>
            
            <div className='aboutimg2-container'>
                <img src={Aboutimg2} className='aboutimg2'/>
            </div>

        </div>

        <div className="stall-coming-container">
  <div className="stall-coming-box">
    <p className="stall-emoji">🛒 Something exciting is coming to Ecomart Sankarankovil…</p>
    <p className="stall-text">
      Loading our brand-new stall experience… <strong>Stay tuned!</strong>
    </p>
    <p className="stall-tags">#EcomartStallReveal #ComingSoon</p>
  </div>
</div>

        </div>
    </div>
  )
}
