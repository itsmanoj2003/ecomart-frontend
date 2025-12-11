// import React, { useEffect, useState } from 'react';
// import './Products.css';
// import logo from '../Components/assets/logo.png';
// import delivery from '../Components/assets/deliverybike.png';
// import axios from 'axios';
// import { useCart } from './Cartcontext';

// export default function Products() {
//     const [data, setData] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");  // Store search input

//     useEffect(() => {
//         axios.get('https://ecomart-api-c4er.onrender.com/ecomart/getproddata')
//             .then(res => setData(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     const { addToCart } = useCart();

//     const filteredData = data.map(category => ({
//         ...category,
//         products: category.products.filter(product =>
//             product.pname.toLowerCase().includes(searchQuery.toLowerCase()) || 
//             product.pcategory.toLowerCase().includes(searchQuery.toLowerCase()) 
//         )
//     })).filter(category => category.products.length > 0);

//     return (
//         <div className='products'>
//             {/* First Title Container */}
//             <div className='products-main'>
//                 <div className='products-logocontainer'>
//                     <img src={logo} className='products-logo' alt="EcoMart Logo" />
//                 </div>
//                 <h1 className='products-title1'>EcoMart’s Aisles</h1>
//                 <h1 className='products-title2'>Save Money! Save Time!</h1>
//                 <div className='delivery-container'>
//                     <h4 className='products-title3'>From our store to your door!</h4>
//                     <img src={delivery} className='delivery-bike' alt="Delivery Bike" />
//                 </div>
//             </div>

//             {/* Search Bar */}
//             <div className='search-container'>
//                 <input 
//                     type='text' 
//                     placeholder='Search products...' 
//                     className='search-field'
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//             </div>

//             {/* Second Products Container */}
//             <div className='products-menu'>
//                 <div className='all-productscontainer'>
//                     {filteredData.length > 0 ? (
//                         filteredData.map((category, key) => (
//                             <div key={key} className="category-container">
//                                 {/* Category Title */}
//                                 <h1 className='category-title'>{category._id}</h1>
//                                 {/* Products Column */}
//                                 <div className="products-grid">
//                                     {category.products.map((x, index) => (
//                                         <div key={index} className='product-container'>
//                                             <div className='product-imgcontainer'>
//                                                 <img src={x.pimg} className='product-image' alt={x.pname} />
//                                             </div>
//                                             <div className='product-contentcontainer'>
//                                                 <h2 className='product-name'>{x.pname}</h2>
//                                                 <label className='product-price'>Price Rs.{x.pprice}</label><br />
//                                                 <p className='product-mrp'>MRP  Rs.{x.pmrp}</p>
//                                                 <p className='product-quantity'><b>Quantity:</b> {x.pquantity}</p>
//                                             </div>
//                                             <div className='product-btncontainer'>
//                                                 <button className='cart-btn' onClick={() => addToCart(x)}>Add to Cart</button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <h2 className='no-results'>No products found</h2>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import './Products.css';
import logo from '../Components/assets/logo.png';
import delivery from '../Components/assets/deliverybike.png';
import axios from 'axios';
import { useCart } from './Cartcontext';

export default function Products() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");  // Store search input

    useEffect(() => {
        axios.get('http://localhost:3001/ecomart/getproddata')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const { addToCart } = useCart();

    // Filter out "Out of Stock" category and products that match the search query
    const filteredData = data
        .filter(category => category._id !== "Out of Stock") // Filter out the "Out of Stock" category
        .map(category => ({
            ...category,
            products: category.products.filter(product =>
                product.pname.toLowerCase().includes(searchQuery.toLowerCase()) || 
                product.pcategory.toLowerCase().includes(searchQuery.toLowerCase()) 
            )
        }))
        .filter(category => category.products.length > 0); // Only include categories with products

    return (
        <div className='products'>
            {/* First Title Container */}
            <div className='products-main'>
                <div className='products-logocontainer'>
                    <img src={logo} className='products-logo' alt="EcoMart Logo" />
                </div>
                <h1 className='products-title1'>EcoMart’s Aisles</h1>
                <h1 className='products-title2'>Save Money! Save Time!</h1>
                <div className='delivery-container'>
                    <h4 className='products-title3'>From our store to your door!</h4>
                    <img src={delivery} className='delivery-bike' alt="Delivery Bike" />
                </div>
            </div>

            {/* Search Bar */}
            <div className='search-container'>
                <input 
                    type='text' 
                    placeholder='Search products...' 
                    className='search-field'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Second Products Container */}
            <div className="product-menu">
            <div className="product-wrapper">
                {filteredData.length > 0 ? (
                filteredData.map((category, key) => (
                    <div key={key} className="category-section">
                    <h2 className="category-heading">{category._id}</h2>
                    <div className="product-grid">
                        {category.products.map((product, index) => (
                        <div key={index} className="product-card">
                            <div className="product-image-wrapper">
                            <img src={product.pimg} alt={product.pname} className="product-image" />
                            </div>
                            <div className="product-details">
                            <h3>{product.pname}</h3>
                            <p className="price">Rs. {product.pprice} <span className="mrp">MRP: Rs. {product.pmrp}</span></p>
                            <p>Qty: {product.pquantity}</p>
                            </div>
                            <button className="add-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                        ))}
                    </div>
                    </div>
                ))
                ) : (
                <h3 className="no-products">Loading...</h3>
                )}
            </div>
            </div>
        </div>
    );
}
