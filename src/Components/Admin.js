import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import Productupdateform from './Productupdateform'
import { useNavigate } from 'react-router-dom'

export default function Admin() {

    const navigate = useNavigate()

    const [list, setList] = useState([
        'Dry Products', 'Sauces', 'Snacks', 'Women\'s beauty', 'Men\'s beauty', 'Health care',
        'Dairy and Beverages', 'Cleaning Agents', 'Devotional products', 'Baby products',
        'Toys and gifts', 'Home Hold', 'Out of Stock'
    ])

    const [quantity, setQuantity] = useState(['1 Piece', '1 Packet', '1 Bottle', '50 g', '100 g', '250 g', '500 g', '750 g', '1 Kg', '1/2 Kg', '1/4 Kg', '3/4 Kg', '2 Kg', '3 Kg', '4 Kg', '5 Kg', '10 Kg', '15 Kg', '20 Kg', '25 Kg', '50 ml', '100 ml', '250 ml', '500 ml', '750 ml', '1 Lit', '1/2 Lit', '1/4 Lit', '3/4 Lit','2 Lit','3 Lit','4 Lit','5 Lit'])

    const [toggle, setToggle] = useState(false)

    const [updatepopup, setUpdatepopup] = useState(false)

    const [proddata, setProddata] = useState({
        pname: '',
        pcategory: '',
        pprice: '',
        pmrp: '',
        pquantity: '',
        pimg: ''
    })

    const [data, setData] = useState([])

    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/ecomart/getproddata')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    function handlePopup() {
        setToggle(true)
    }

    function handleChange(e) {
        setProddata({ ...proddata, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3001/ecomart/addproduct', proddata)
            .then(res => alert("Product Added Successfully"),
                setProddata({
                    pname: '',
                    pcategory: '',
                    pprice: '',
                    pmrp: '',
                    pquantity: '',
                    pimg: ''
                }))
        setToggle(false)
    }

    function cancel() {
        setToggle(false)
        setProddata({
            pname: '',
            pcategory: '',
            pprice: '',
            pmrp: '',
            pquantity: '',
            pimg: ''
        })
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:3001/ecomart/delete/${id}`)
            .then(res => alert('Product Deleted Successfully'))
    }

    function handleEdit(product) {
        setData(product)
        setUpdatepopup(true)
    }

    return (
        <div className='admin'>

            <div className='admin-main'>

                <div className='admin-top'>
                    <div className='admintitle-container'>
                        <h1 className='admin-maintitle'>EcoMart's</h1>
                        <h1 className='admin-subtitle'>Control Hub</h1>
                    </div>

                    <div className='adminform-container'>
                        <button className='addprod-btn' onClick={handlePopup}>Add Product</button>

                        {toggle ? <form onSubmit={handleSubmit} className='admin-form'>

                            <input type='text' placeholder='Name of the Product' id='admin-productname' name='pname' value={proddata.pname} onChange={handleChange} required /><br />

                            <select id='category' name='pcategory' value={proddata.pcategory} onChange={handleChange} required>
                                <option value=''>Select Product Category</option>
                                {list.map(x => <option value={x} key={x}>{x}</option>)}
                            </select><br />

                            <input type='number' placeholder='Enter Product Price' id='price' name='pprice' value={proddata.pprice} onChange={handleChange} required /><br />

                            <input type='number' placeholder='Product MRP' id='desc' name='pmrp' value={proddata.pmrp} onChange={handleChange} required /><br />

                            <select id='quantity' name='pquantity' value={proddata.pquantity} onChange={handleChange} required>
                                <option value=''>Select Quantity</option>
                                {quantity.map(x => <option value={x} key={x}>{x}</option>)}
                            </select>

                            <input type='text' placeholder='Product Image' id='prod-img' name='pimg' value={proddata.pimg} onChange={handleChange} required /><br />

                            <div className='addprodform-btns'>
                                <button type='submit' className='add'>Add</button>
                                <button className='cancel' onClick={cancel}>Cancel</button>
                            </div>

                        </form> : <div className='adminmsg-container'>

                            <h1 className='admin-title'>Welcome back, Admin!</h1>
                            <h3 className='admin-msg'> Time to boost EcoMart with some amazing updates!</h3>
                            <button className='view-orders' onClick={() => navigate('/adminorders')} >View Orders</button>
                            <button className='post-offers' onClick={() => navigate('/adminoffers')}>Post Offers</button>

                        </div>}
                    </div>

                </div>

            </div>

            <div className='admin-botton'>
                <div className='admin-listcontainer'>
                    <h1 className='prodlist-title'>Products List</h1>

                    {/* 🔍 Search Bar */}
                    <input
                        type='text'
                        className='admin-searchbar'
                        placeholder='Search product name or category...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        style={{ padding: '8px', marginBottom: '20px', borderRadius: '5px', border: '1px solid gray' }}
                    />

                    <table className='products-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>MRP</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Drop and Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(data) && data.map((category, key) => {
                                const filteredProducts = category.products.filter(x =>
                                    x.pname.toLowerCase().includes(search) || x.pcategory.toLowerCase().includes(search)
                                )
                                if (filteredProducts.length === 0) return null

                                return (
                                    <React.Fragment key={key}>
                                        <tr>
                                            <td colSpan="7" style={{ fontWeight: "bold", textAlign: "center" }}>{category._id}</td>
                                        </tr>
                                        {filteredProducts.map((x, index) => (
                                            <tr key={index}>
                                                <td>{x.pname}</td>
                                                <td>{x.pcategory}</td>
                                                <td>{x.pprice}</td>
                                                <td>{x.pmrp}</td>
                                                <td>{x.pquantity}</td>
                                                <td>
                                                    <img src={x.pimg} className='admin-productimage' alt="Product" />
                                                </td>
                                                <td>
                                                    <button className='crud-btn' onClick={() => handleEdit(x)}>Update</button>
                                                    <button className='crud-btn' onClick={() => handleDelete(x._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {updatepopup && <Productupdateform setUpdatepopup={setUpdatepopup} data={data} />}
        </div>
    )
}
