import React, { useState } from 'react'
import './Productupdateform.css'
import axios from 'axios'

export default function Productupdateform({ setUpdatepopup, data }) {

    const [list] = useState([
        'Dry Products', 'Sauces', 'Snacks', "Women's beauty", "Men's beauty",
        'Health care', 'Dairy Products', 'Cleaning Agents', 'Devotional products',
        'Baby products', 'Toys and gifts', 'Home Hold', 'Oil Products',
        'Juices & Beverages', 'Vegetables', 'Jam', 'Out of Stock'
    ])

    const [updatedata, setUpdatedata] = useState({
        itemcode: data.itemcode || '',
        itemid: data.itemid || '',
        itemname: data.itemname || '',
        qty: data.qty || '',
        selling: data.selling || '',
        mrp: data.mrp || '',
        discperc: data.discperc || '',
        gstperc: data.gstperc || '',
        amount: data.amount || '',
        discamt: data.discamt || '',
        gstamt: data.gstamt || '',
        netamt: data.netamt || '',
        itemcategory: data.itemcategory || '',
        itemimg: data.itemimg || ''
    })

    /* ✅ SAFE NUMBER HANDLING */
    function handleChange(e) {
        const { name, value, type } = e.target

        setUpdatedata({
            ...updatedata,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        axios
            .put(`https://ecomart-backend-2-h3fw.onrender.com/ecomart/updateproddata/${data._id}`, updatedata)
            .then(() => {
                alert('Product Updated Successfully')
                setUpdatepopup(false)
            })
            .catch(err => console.log(err))
    }

    function cancel() {
        setUpdatepopup(false)
    }

    return (
        <div className='productupdate-popup'>
            <div className='productupdate-container'>
                <h2 className='updateform-title'>Update Product</h2>

                <form className='produpdate-form' onSubmit={handleSubmit}>

                    <input
                        type='number'
                        name='itemcode'
                        placeholder='Item Code'
                        value={updatedata.itemcode}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type='text'
                        name='itemid'
                        placeholder='Item ID (optional)'
                        value={updatedata.itemid}
                        onChange={handleChange}
                    />

                    <input
                        type='text'
                        name='itemname'
                        placeholder='Product Name'
                        value={updatedata.itemname}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type='text'
                        name='qty'
                        placeholder='Quantity'
                        value={updatedata.qty}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type='number'
                        name='selling'
                        placeholder='Selling Price'
                        value={updatedata.selling}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type='number'
                        name='mrp'
                        placeholder='MRP'
                        value={updatedata.mrp}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type='number'
                        name='discperc'
                        placeholder='Discount %'
                        value={updatedata.discperc}
                        onChange={handleChange}
                    />

                    <input
                        type='number'
                        name='gstperc'
                        placeholder='GST %'
                        value={updatedata.gstperc}
                        onChange={handleChange}
                    />

                    <input
                        type='number'
                        name='amount'
                        placeholder='Amount'
                        value={updatedata.amount}
                        onChange={handleChange}
                    />

                    <input
                        type='number'
                        name='discamt'
                        placeholder='Discount Amount'
                        value={updatedata.discamt}
                        onChange={handleChange}
                    />

                    <input
                        type='number'
                        name='gstamt'
                        placeholder='GST Amount'
                        value={updatedata.gstamt}
                        onChange={handleChange}
                    />

                    <input
                        type='number'
                        name='netamt'
                        placeholder='Net Amount'
                        value={updatedata.netamt}
                        onChange={handleChange}
                    />

                    <select
                        name='itemcategory'
                        value={updatedata.itemcategory}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select Product Category</option>
                        {list.map((x, i) => (
                            <option key={i} value={x}>{x}</option>
                        ))}
                    </select>

                    <input
                        type='text'
                        name='itemimg'
                        placeholder='Item Image URL'
                        value={updatedata.itemimg}
                        onChange={handleChange}
                        required
                    />

                    <div className='btn-container'>
                        <button type='submit' className='update-btn'>Update</button>
                        <button type='button' className='cancel-btn' onClick={cancel}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
