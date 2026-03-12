import React, { useState } from 'react'
import './Productupdateform.css'
import axios from 'axios'

export default function Productupdateform({ setUpdatepopup, data }) {

    const [list] = useState([
    'OATS & CEREAL FOOD ITEMS',
    'COSMETIC ITEMS',
    'BABY DIAPERS',
    'KITCHEN ACCESSORIES',
    'BISCUITS & COOKIES, RUSK',
    'VINEGAR & SODA ITEMS',
    'COOL DRINKS',
    'DRY FRUITS & NUTS',
    'TOYS',
    'COSMETICS',
    'WINE ITEMS',
    'CHIPS ITEMS',
    'SEMIYA ITEMS',
    'SCHOOL BAG',
    'COLLEGE BAG',
    'LADIES HAND BAG',
    'LUNCH BAG',
    'GIFT ITEM',
    'CLEANING PRODUCTS',
    'MAT',
    'KITCHEN TOWEL',
    'BROOMS',
    'FANCY BROOMS',
    'LADIES HAND PURSES',
    'LADIES SLIM BAG',
    'ADULT DIAPER',
    'IMPORTED HOUSE HOLD',
    'GROCERY PRODUCTS',
    'WATER BOTTLE',
    'UMBRELLA',
    'MANI MARK',
    'IMPORTER STATIONARY',
    'EVER SILVER',
    'GARUTA SS',
    'BANGLES',
    'COVERING BANGLES',
    'FANCY BANGLES',
    'MILK, CURD BUTTER & CHEESE ITEMS',
    'HAIR ACCESSORIES',
    'COVERING EARING',
    'MASSAGE OIL',
    'FANCY EARINGS',
    'SWISS GOLD EARING',
    'AARAM',
    'SHORT CHAIN',
    'FANCY ITEM',
    'KEY CHAIN',
    'ICECREAM',
    'PLASTIC',
    'PLASTIC ITEM',
    'BIRTHDAY DECOR ITEM',
    'BAKING ITEMS',
    'PET FOODS',
    'TISSUE ITEM',
    'LED BULB',
    'HOOK',
    'TORCH LIGHT',
    'MEDICINE',
    'SKIN & COSMETICS ITEMS',
    'BABY PRODUCTS',
    'SUGAR & JAGGERY ITEMS',
    'COFFEE POWDER',
    'DRINK MIX ITEMS',
    'PICKLE',
    'AGARBATTI & CAMPHOR',
    'DISHWASH LIQ & SOAP POWDER',
    'PUJA ITEMS',
    'DATES',
    'STATIONARY ITEMS',
    'HAIR OIL & OTHER HAIR PRODUCTS',
    'TALCUM POWDER',
    'BATH SOAP & BODYWASH ITEMS',
    'FOOD & FLOUR ITEMS',
    'PAIN KILLER & MEDIC PRODUCTS',
    'BODY SPRAY & FRAGRANCE',
    'BATTERY & ELECTRONICS ITEMS',
    'NAIL CLIPPER',
    'CHOCOLATE & CAKE ITEMS',
    'JAM & SPREAD ITEMS',
    'FACE WASH, GEL & CREAM ITEMS',
    'SHAMPOO & CONDITIONER ITEMS',
    'HAND WASH & SANITIZER ITEMS',
    'LIP CARE & LIP STICK ITEMS',
    'CAR FRESHNER',
    'HONEY',
    'DETERGENT SOAP POWDER & LIQUID',
    'TOOTH PASTE & POWDER, MOUTHWASH',
    'RICE AND MILLET ITEMS',
    'FLOOR & BATHROOM CLEANER',
    'TOOTH BRUSH ITEMS',
    'GHEE & DALDA ITEMS',
    'ENERGY DRINK & POWDERS',
    'HEALTH DRINK & MIX ITEMS',
    'FOOD MIX & ESSENCE ITEMS',
    'CANDLES & LIGHTS',
    'LIQ VAPORISER & INSECTS KILLER',
    'GLASS & KITCHEN CLEANER',
    'TOILET & BATHROOM CLEANER',
    'SHOE POLISH ITEMS',
    'FABRIC CONDITIONER & WHITENER',
    'SHAVING CREAM, LOTION & RAZOR',
    'ROOM & BATHROOM FRAGRANCE',
    'SPORTS ITEMS',
    'COOKING OIL',
    'SWEETS & SNACKS ITEMS',
    'MASALA & SPICES',
    'APPALAM & FRY ITEMS',
    'BABY FOODS & MILK POWDER',
    'NOODLES & FAST FOOD ITEMS',
    'SAUCE & KETCHUP ITEMS',
    'TEA POWDER',
    'SALT ITEMS',
    'NAPKIN ITEMS'
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
            .put(`https://api.ecomartsangai.in/ecomart/updateproddata/${data._id}`, updatedata)
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
