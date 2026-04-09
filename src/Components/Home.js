import React from 'react'
import './Home.css'





// import homeimage from '../Components/assets/homeimg.png'
import homeimage from '../Components/assets/MainBg.png'
import cartimg from '../Components/assets/cart.png'
import { useNavigate } from 'react-router-dom'


// Group Images
import foodgroceries from '../Components/assets/GroupImg/food&grocery.png'
import personalcare from '../Components/assets/GroupImg/personalcare.png'
import household from '../Components/assets/GroupImg/household.png'
import babycare from '../Components/assets/GroupImg/babycare.png'
import accessories from '../Components/assets/GroupImg/accessories.png'
import toys from '../Components/assets/GroupImg/toys.png'
import bags from '../Components/assets/GroupImg/bags.png'
import devotional from '../Components/assets/GroupImg/devotional.png'
import kitchen from '../Components/assets/GroupImg/kitchen.png'
import electronics from '../Components/assets/GroupImg/electronics.png'
import healthcare from '../Components/assets/GroupImg/healthcare.png'
import misc from '../Components/assets/GroupImg/misc.png'





export default function Home() {
    const navigate=useNavigate()

    const goToGroup = (slug) => {
    navigate(`/group/${slug}`)
    }

  return (
    <div className='home'>

        <div className='home-first'>

        <div className='homemain'>

        <div className='homecontent'>

        {/* Mobile Home Image */}
        {/* <div className='mobilehomeimg-container'>
          <img src={homeimage} className='mobilehome-img'/>
        </div> */}
        
        <h1 className='home-title'>EcoMart For<br/>Fresh Grocery</h1>
        <p className='home-description'>Inroduced a new model for online grocery<br/>shopping and convenient home delivery</p>
        <button className='shopnow-btn' onClick={()=>navigate('/products')}>Shop Now ➟</button>

        </div>

        {/* Desktop Home image */}
        <div className='home-img'> 
          <img src={homeimage}/>
        </div>

        </div>

        </div>

        <div className='home-second'> 
              <img src={cartimg} className='home-cartimg'/>

              <div className='homesecond-content'>
              <h2 className='homesecond-title'>Welcome to Eco Mart</h2>
              <p className='homesecond-description'>Get the Fresh Groceries and Goods</p>
              </div>
              <button className='catogiries-btn'>Categories</button>
        </div>


        {/* Categories */}

        <h2 className='categories-title'>Discover What You Need</h2>

        <div className='categories'>

        <div className='categories-list'>

              {/* Dry Products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Food & Groceries</h2>
                        <p className='categories-para'>Wholesome staples for your daily meals – rice, oats, cornflakes, and more.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('food-groceries')}>View Now ➟</button>
                </div>
                <img src={foodgroceries} className='categories-img'/>
            </div>

            {/* Sauce Products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Personal Care<br/><br/></h2>
                        <p className='categories-para'>Everyday essentials for hygiene and grooming – skincare, haircare, and body care products.<br/><br/></p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('personal-care')}>View Now ➟</button>
                 </div>
                <img src={personalcare} className='categories-img'/>
            </div>

             {/* Snacks Products */} 
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Household Cleaning</h2>
                        <p className='categories-para'>Keep your home fresh and clean – detergents, cleaners, and daily maintenance essentials.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('household-cleaning')}>View Now ➟</button>
                </div>
                <img src={household} className='categories-img'/>
            </div>

            {/* Women beauty products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Baby Care</h2>
                        <p className='categories-para'>Gentle and safe products for babies – diapers, nutrition, and daily care essentials.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('baby-care')}>View Now ➟</button>
                </div>
                <img src={babycare} className='categories-img'/>
            </div>

            {/* Mens beauty products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Kitchen</h2>
                        <p className='categories-para'>Essential tools and items for your kitchen – utensils, storage, and cooking accessories.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('kitchen-home')}>View Now ➟</button>
                </div>
                <img src={kitchen} className='categories-img'/>
            </div>

            {/* Health and care products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Fashion & Accessories</h2>
                        <p className='categories-para'>Stylish and useful accessories – bags, jewelry, and everyday fashion essentials.<br/><br/></p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('fashion-accessories')}>View Now ➟</button>
                </div>
                <img src={accessories} className='categories-img'/>
            </div>

            {/* Dairy and Beverages products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Kids & Toys</h2>
                        <p className='categories-para'>Fun and engaging products for kids – toys, games, and celebration items.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('kids-toys')}>View Now ➟</button>
                </div>
                <img src={toys} className='categories-img'/>
            </div>

            {/* Cleaning products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Stationary Bags<br/></h2>
                        <p className='categories-para'>Everything for school and office – bags, notebooks, and essential supplies.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={() => goToGroup('stationary-bags')}>View Now ➟</button>
                </div>
                <img src={bags} className='categories-img'/>
            </div>
            
            {/* Devotional products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Devotional </h2>
                        <p className='categories-para'>Spiritual and utility items – pooja essentials, lighting, and miscellaneous goods.</p>
                    </div>    
                    <button className='categories-shopbtn' onClick={() => goToGroup('devotional')}>View Now ➟</button>
                </div>
                <img src={devotional} className='categories-img'/>
            </div>

            {/* Devotional products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Electronics & Utilities </h2>
                        <p className='categories-para'>Everyday electronic essentials like batteries, lighting items, and small utility gadgets.</p>
                    </div>    
                    <button className='categories-shopbtn' onClick={() => goToGroup('electronics-utilities')}>View Now ➟</button>
                </div>
                <img src={electronics} className='categories-img'/>
            </div>

            {/* Devotional products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Health & Medical </h2>
                        <p className='categories-para'>Essential health and wellness items including medicines, personal care, and basic medical supplies.</p>
                    </div>    
                    <button className='categories-shopbtn' onClick={() => goToGroup('health-medical')}>View Now ➟</button>
                </div>
                <img src={healthcare} className='categories-img'/>
            </div>

            {/* Devotional products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Plastics & Others </h2>
                        <p className='categories-para'>Daily-use plastic items, household utilities, storage products, and miscellaneous goods.</p>
                    </div>    
                    <button className='categories-shopbtn' onClick={() => goToGroup('miscellaneous')}>View Now ➟</button>
                </div>
                <img src={misc} className='categories-img'/>
            </div>

        </div>

        </div>

        <br/>
        <br/>


        
        <footer className='footer'>
            <p><span className='copyrights-symbol'>&copy;</span> 2026 EcoMart. All rights reserved | Developed by Soft Stor Technology</p>
        </footer>


    </div>
  )
}
