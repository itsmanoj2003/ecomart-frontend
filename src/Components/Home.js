import React from 'react'
import './Home.css'





// import homeimage from '../Components/assets/homeimg.png'
import homeimage from '../Components/assets/groceries.png'
import cartimg from '../Components/assets/cart.png'
import dryproducts from '../Components/assets/dryproducts.png'
import sauce from '../Components/assets/sause.png'
import snacks from '../Components/assets/snacks.png'
import women from '../Components/assets/ladiesbeauty.png'
import men from '../Components/assets/menbeauty.png'
import healthcare from '../Components/assets/healthcare.png'
import dairy from '../Components/assets/dairy.png'
import cleaners from '../Components/assets/cleaners.png'
import devotional from '../Components/assets/devotional.png'
import baby from '../Components/assets/baby.png'
import toys from '../Components/assets/toys.png'
import homeproducts from '../Components/assets/homeproducts.png'
import stationary from '../Components/assets/stationary.png'
import dailyproducts from '../Components/assets/dailyproducts.png'
import washingitems from '../Components/assets/washing.png'
import { useNavigate } from 'react-router-dom'



export default function Home() {
    const navigate=useNavigate()
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

        <h2 className='categories-title'>Categories</h2>

        <div className='categories'>

        <div className='categories-list'>

              {/* Dry Products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Groceries</h2>
                        <p className='categories-para'>Wholesome staples for your daily meals – rice, oats, cornflakes, and more.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={dryproducts} className='categories-img'/>
            </div>

            {/* Sauce Products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Sauces & Mixtures<br/><br/></h2>
                        <p className='categories-para'>Mayonnaise, Ketchup, Soy Sauce, Hot Sauce, and Mixed Fruit Jam<br/><br/></p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>              
                 </div>
                <img src={sauce} className='categories-img'/>
            </div>

             {/* Snacks Products */} 
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Snacks<br/><br/></h2>
                        <p className='categories-para'>Savory Snacks, Sweet Snacks, Homemade Snacks, and Healthy Snacks</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={snacks} className='categories-img'/>
            </div>

            {/* Women beauty products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Oil and Ghee</h2><br/>
                        <p className='categories-para'>Pure cooking oils and aromatic ghee for traditional and modern dishes.</p>
                        <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                    </div>
                </div>
                <img src={women} className='categories-img'/>
            </div>

            {/* Mens beauty products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Flours</h2>
                        <p className='categories-para'>Bake or cook with the finest flours and ready-to-use mixes.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={men} className='categories-img'/>
            </div>

            {/* Health and care products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Health Mix</h2>
                        <p className='categories-para'>A nourishing blend of grains, pulses, and nuts for a wholesome start.<br/><br/></p>
                        <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                    </div>
                </div>
                <img src={healthcare} className='categories-img'/>
            </div>

            {/* Dairy and Beverages products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Rice & Millets</h2>
                        <p className='categories-para'>Nutritious staples from classic basmati to wholesome millets – perfect for every Indian kitchen.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={dairy} className='categories-img'/>
            </div>

            {/* Cleaning products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Cleaning products<br/></h2>
                        <p className='categories-para'>Toilet Cleaners, Scrub Pads and Brushes, Floor Cleaners, Glass Cleaners, and Toilet Brushes<br/><br/></p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={cleaners} className='categories-img'/>
            </div>
            
            {/* Devotional products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Devotional Products </h2>
                        <p className='categories-para'>Incense Sticks, and Champer<br/><br/><br/></p>
                    </div>    
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={devotional} className='categories-img'/>
            </div>

            {/* Baby products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Baby Products</h2>
                        <p className='categories-para'>Diapers, Cashews, Baby Wipes, Diaper Rash Cream, Bottles, Baby Lotion, and Baby Soap/Shampoo</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={baby} className='categories-img'/>
            </div>

            {/* Toys and gifts */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Toys and gifts</h2>
                        <p className='categories-para'>MyBoxPrinter Custom Clock Packaging Boxes<br/><br/><br/></p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={toys} className='categories-img'/>
            </div>

            {/* Home products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Body Wash Products</h2>
                        <p className='categories-para'>Gentle care for your skin with refreshing fragrances and trusted protection.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={homeproducts} className='categories-img'/>
            </div>

               {/* Stationary Items */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Stationary</h2>
                        <p className='categories-para'>From notebooks to pens – stock up on everyday essentials.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={stationary} className='categories-img'/>
            </div>

            {/* Daily Products */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Daily Products</h2>
                        <p className='categories-para'>All your must-haves – from morning to night, in one spot.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={dailyproducts} className='categories-img'/>
            </div>

            {/* Washing Items */}
            <div className='category'>
                <div className='categories-content'>
                    <div className='categories-desccont'>
                        <h2 className='categories-heading'>Washing Products</h2>
                        <p className='categories-para'>From powders to liquids – powerful cleaning for every fabric.</p>
                    </div>
                    <button className='categories-shopbtn' onClick={()=>navigate('/products')}>Shop Now ➟</button>
                </div>
                <img src={washingitems} className='categories-img'/>
            </div>

        </div>

        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


    </div>
  )
}
