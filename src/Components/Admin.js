import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import Productupdateform from './Productupdateform'
import { useNavigate } from 'react-router-dom'

export default function Admin() {

    const navigate = useNavigate()

    const [toggle, setToggle] = useState(false)
    const [updatepopup, setUpdatepopup] = useState(false)


    const [list] = useState([
        'Dry Products', 'Sauces', 'Snacks', "Women's beauty", 'Men\'s beauty', 'Health care',
        'Dairy Products', 'Cleaning Agents', 'Devotional products', 'Baby products',
        'Toys and gifts', 'Home Hold', 'Oil Products', 'Juices & Beverages', 'Vegetables', 'Jam',  'Out of Stock'
    ])

    const [proddata, setProddata] = useState({
        itemcode: '',
        itemid: '',
        itemname: '',
        qty: '',
        selling: '',
        mrp: '',
        discperc: '',
        gstperc: '',
        amount: '',
        discamt: '',
        gstamt: '',
        netamt: '',
        itemcategory:'',
        itemimg: '',
    })

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://api.ecomartsangai.in/ecomart/getproddata')
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

        axios
            .post('https://api.ecomartsangai.in/ecomart/addpro', proddata)
            .then(() => alert('Product Added Successfully'))

        setToggle(false)
        setProddata({
            itemcode: '',
            itemid: '',
            itemname: '',
            qty: '',
            selling: '',
            mrp: '',
            amount: '',
            discperc: '',
            gstamt: '',
            discamt: '',
            gstperc: '',
            netamt: '',
            itemcategory:'',
            itemimg: ''
        })
    }

    function cancel() {
        setToggle(false)
    }

    function handleDelete(id) {
        axios
            .delete(`https://api.ecomartsangai.in/ecomart/delete/${id}`)
            .then(() => alert('Product Deleted Successfully'))
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
                        <button className='addprod-btn' onClick={handlePopup}>
                            Add Product
                        </button>

                        {toggle ? (
                            <form onSubmit={handleSubmit} className='admin-form'>

                                <input
                                    type='number'
                                    placeholder='Item Code'
                                    name='itemcode'
                                    id='itemcode'
                                    value={proddata.itemcode}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type='text'
                                    placeholder='Item ID (optional)'
                                    name='itemid'
                                    id='itemid'
                                    value={proddata.itemid}
                                    onChange={handleChange}
                                />

                                <input
                                    type='text'
                                    placeholder='Product Name'
                                    name='itemname'
                                    id='itemname'
                                    value={proddata.itemname}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type='text'
                                    placeholder='Quantity'
                                    name='qty'
                                    id='itemqty'
                                    value={proddata.qty}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type='number'
                                    placeholder='Selling Price'
                                    name='selling'
                                    id='itemselling'
                                    value={proddata.selling}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type='number'
                                    placeholder='MRP'
                                    name='mrp'
                                    id='itemmrp'
                                    value={proddata.mrp}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type='number'
                                    placeholder='Discount % (optional)'
                                    name='discperc'
                                    id='itemdiscperc'
                                    value={proddata.discperc}
                                    onChange={handleChange}
                                />

                                <input
                                    type='number'
                                    placeholder='GST %'
                                    name='gstperc'
                                    id='itemgstperc'
                                    value={proddata.gstperc}
                                    onChange={handleChange}
                                />

                                <input
                                    type='number'
                                    placeholder='Amount'
                                    name='amount'
                                    id='itemamount'
                                    value={proddata.amount}
                                    onChange={handleChange}
                                />

                                <input
                                    type='number'
                                    placeholder='Discount Amount (optional)'
                                    name='discamt'
                                    id='itemdiscamt'
                                    value={proddata.discamt}
                                    onChange={handleChange}
                                />

                                <input
                                    type='number'
                                    placeholder='GST Amount'
                                    name='gstamt'
                                    id='itemgstamt'
                                    value={proddata.gstamt}
                                    onChange={handleChange}
                                />

                                <input
                                    type='number'
                                    placeholder='Net Amount'
                                    name='netamt'
                                    id='itemneramt'
                                    value={proddata.netamt}
                                    onChange={handleChange}
                                />

                                <select
                                    id='itemcategory'
                                    name='itemcategory'
                                    value={proddata.itemcategory}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=''>Select Product Category</option>
                                    {list.map(x => <option value={x} key={x}>{x}</option>)}
                                </select><br />

                                <input
                                    type='text'
                                    placeholder='Item Image URL'
                                    name='itemimg'
                                    id='itemimg'
                                    value={proddata.itemimg}
                                    onChange={handleChange}
                                    required
                                />

                                <div className='addprodform-btns'>
                                    <button type='submit' className='add'>Add</button>
                                    <button type='button' className='cancel' onClick={cancel}>
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        ) : (
                            <div className='adminmsg-container'>
                                <h1 className='admin-title'>Welcome back, Admin!</h1>
                                <h3 className='admin-msg'>Time to boost EcoMart 🚀</h3>
                                <button
                                    className='view-orders'
                                    onClick={() => navigate('/adminorders')}
                                >
                                    View Orders
                                </button>
                                <button
                                    className='post-offers'
                                    onClick={() => navigate('/adminoffers')}
                                >
                                    Post Offers
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='admin-botton'>
                <div className='admin-listcontainer'>
                    <h1 className='prodlist-title'>Products List</h1>

                    <input
                        type='text'
                        className='admin-searchbar'
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />

                    <table className='products-table'>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Selling</th>
                                <th>MRP</th>
                                <th>Net Amount</th>
                                <th>Image</th>
                                <th>Drop & Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(data) && data.map((category, key) => {

                                const filteredProducts = category.products.filter(x =>
                                    x.itemname?.toLowerCase().includes(search) ||
                                    x.itemcategory?.toLowerCase().includes(search) ||
                                    String(x.itemcode).includes(search)
                                )

                                if (filteredProducts.length === 0) return null

                                return (
                                    <React.Fragment key={key}>

                                        {/* CATEGORY HEADER ROW */}
                                        <tr>
                                            <td
                                                colSpan="8"
                                                style={{
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    backgroundColor: '#0B9F51',
                                                    color: 'white'
                                                }}
                                            >
                                                {category._id}
                                            </td>
                                        </tr>

                                        {/* PRODUCTS UNDER CATEGORY */}
                                        {filteredProducts.map((x, index) => (
                                            <tr key={index}>
                                                <td>{x.itemcode}</td>
                                                <td>{x.itemname}</td>
                                                <td>{x.qty}</td>
                                                <td>{x.selling}</td>
                                                <td>{x.mrp}</td>
                                                <td>{x.netamt}</td>
                                                <td>
                                                    <img
                                                        src={x.itemimg}
                                                        alt="Product"
                                                        className='admin-productimage'
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        className='crud-btn'
                                                        onClick={() => handleEdit(x)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className='crud-btn'
                                                        onClick={() => handleDelete(x._id)}
                                                    >
                                                        Delete
                                                    </button>
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

            {updatepopup && (
                <Productupdateform
                    setUpdatepopup={setUpdatepopup}
                    data={data}
                />
            )}
        </div>
    )
}
