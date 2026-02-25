import React, { useEffect, useState } from 'react'
import './Products.css'
import logo from '../Components/assets/logo.png'
import delivery from '../Components/assets/deliverybike.png'
import axios from 'axios'
import { useCart } from './Cartcontext'

export default function Products() {

    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)

    const { addToCart } = useCart()

    /* ================= API CALL ================= */
useEffect(() => {

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                `https://api.ecomartsangai.in/ecomart/getproddata?page=${page}&search=${searchQuery}`
            )

            if (page === 1) {
                setData(res.data)
            } else {
                // 🔥 SIMPLE APPEND (NO MERGE)
                setData(prev => [...prev, ...res.data])
            }

        } catch (err) {
            console.log(err)
        }
    }

    fetchProducts()

}, [page, searchQuery])

    return (
        <div className='products'>

            {/* ===== HEADER SECTION ===== */}
            <div className='products-main'>
                <div className='products-logocontainer'>
                    <img src={logo} className='products-logo' alt='EcoMart Logo' />
                </div>

                <h1 className='products-title1'>EcoMart’s Aisles</h1>
                <h1 className='products-title2'>Save Money! Save Time!</h1>

                <div className='delivery-container'>
                    <h4 className='products-title3'>From our store to your door!</h4>
                    <img src={delivery} className='delivery-bike' alt='Delivery Bike' />
                </div>
            </div>

            {/* ===== SEARCH BAR ===== */}
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search products...'
                    className='search-field'
                    value={searchQuery}
                    onChange={(e) => {
                        setPage(1)
                        setData([])
                        setSearchQuery(e.target.value)
                    }}
                />
            </div>

            {/* ===== PRODUCTS LIST ===== */}
 <div className='product-menu'>
                <div className='product-wrapper'>

                    {data.length > 0 ? (
                        data
                            .filter(category => category._id !== 'Out of Stock')
                            .map((category, key) => (

                                <div key={key} className='category-section'>

                                    <h2 className='category-heading'>{category._id}</h2>

                                    <div className='product-grid'>
                                        {category.products.map((product, index) => (

                                            /* ===== OPTIMIZED CARD ===== */
                                            <div key={index} className='product-card'>

                                                <img
                                                    src={product.itemimg}
                                                    alt={product.itemname}
                                                    className='product-image'
                                                    loading="lazy"
                                                />

                                                <h3 className="product-title">
                                                    {product.itemname}
                                                </h3>

                                                <div className='price'>
                                                    Rs. {product.selling}
                                                    <span className='mrp'>
                                                        Rs. {product.mrp}
                                                    </span>
                                                </div>

                                                <button
                                                    className='add-cart-btn'
                                                    onClick={() =>
                                                        addToCart({
                                                            ...product,
                                                            price: product.netamt
                                                        })
                                                    }
                                                >
                                                    Add
                                                </button>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                    ): (
                        <h3 className='no-products'>Loading...</h3>
                    )}

                </div>
            </div>

            {/* ===== LOAD MORE BUTTON ===== */}
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="add-cart-btn"
                >
                    Load More
                </button>
            </div>

            {/* ===== FLOATING CART BUTTON ===== */}
            <button
                className="floating-cart-btn"
                onClick={() => window.location.href = '/cart'}
            >
                🛒 Cart
            </button>

        </div>
    )
}