import React, { useState } from 'react';
import './Productupdateform.css';
import axios from 'axios';

export default function Productupdateform({ setUpdatepopup, data }) {
    const [list, setList] = useState([
        'Dry Products', 'Sauces', 'Snacks', "Women's beauty", "Men's beauty",
        'Health care', 'Dairy and Beverages', 'Cleaning Agents', 'Devotional products',
        'Baby products', 'Toys and gifts', 'Home Hold','Out of Stock'
    ]);

    const [quantity, setQuantity] = useState(['1 Piece', '1 Kg', '1 Packet', '1 Litre','1 Bottle']);

    const [updatedata, setUpdatedata] = useState({
        pname: data.pname,
        pcategory: data.pcategory,
        pprice: data.pprice,
        pdesc: data.pdesc,
        pimg: data.pimg,
        pmrp: data.pmrp,
        pquantity: data.pquantity
    });

    function handleChange(e) {
        setUpdatedata({ ...updatedata, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.put(`https://ecomart-backend-2-h3fw.onrender.com/ecomart/updateproddata/${data._id}`, updatedata)
            .then(res => alert('Product Updated Successfully'),
                setUpdatepopup(false))
    }

    function cancel() {
        setUpdatepopup(false);
    }

    return (
        <div className='productupdate-popup'>
            <div className='productupdate-container'>
                <h2 className='updateform-title'>Update Product</h2>
                <form className='produpdate-form' onSubmit={handleSubmit}>
                    <input type='text' id='update-productname' name='pname' placeholder='Name of the Product' value={updatedata.pname} onChange={handleChange} /><br />
                    <select id='update-category' name='pcategory' value={updatedata.pcategory} onChange={handleChange}>
                        <option value=''>Select Product Category</option>
                        {list.map((x, i) => <option key={i} value={x}>{x}</option>)}
                    </select><br />
                    <input type='number' id='update-price' name='pprice' placeholder='Enter Product Price' value={updatedata.pprice} onChange={handleChange} /><br />
                    <input type='number' id='update-mrp' name='pmrp' placeholder='Enter MRP' value={updatedata.pmrp} onChange={handleChange} /><br />
                    <select id='update-quantity' name='pquantity' value={updatedata.pquantity} onChange={handleChange}>
                        <option value=''>Select Quantity</option>
                        {quantity.map((x, i) => <option key={i} value={x}>{x}</option>)}
                    </select><br />
                    <textarea id='update-desc' name='pdesc' placeholder='Product Description...' value={updatedata.pdesc} onChange={handleChange}></textarea><br />
                    <input type='text' id='update-prodimg' name='pimg' placeholder='Product Image' value={updatedata.pimg} onChange={handleChange} /><br />
                    <div className='btn-container'>
                        <button type='submit' className='update-btn'>Update</button>
                        <button type='button' className='cancel-btn' onClick={cancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
