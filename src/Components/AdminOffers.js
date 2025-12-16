import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./AdminOffers.css";
import { useNavigate } from "react-router-dom";

export default function AdminOffers() {

  const navigate = useNavigate();

  const [quantity] = useState(['1 Piece', '1 Pack', '1 Bottle', '50 g', '100 g', '250 g', '500 g', '750 g', '1 Kg', '1/2 Kg', '1/4 Kg', '3/4 Kg', '2 Kg', '3 Kg', '4 Kg', '5 Kg', '10 Kg', '15 Kg', '20 Kg', '25 Kg', '50 ml', '100 ml', '250 ml', '500 ml', '750 ml', '1 Lit', '1/2 Lit', '1/4 Lit', '3/4 Lit','2 Lit','3 Lit','4 Lit','5 Lit']);

  // form state
  const [formData, setFormData] = useState({
    offerName: "",
    percentage: "",
    startDate: "",
    endDate: "",
    products: [{ id: 1, productName: "", originalPrice: "", discountPrice: "", image: "", quantity:""}]
  });

  // other states
  const [offers, setOffers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [editingId, setEditingId] = useState(null); // null => create mode

  // fetch offers on mount
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get('https://ecomart-backend-2-h3fw.onrender.com/ecomart/getoffers');
      setOffers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch offers", err);
      setOffers([]);
    }
  };

  // form handlers
  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = [...prev.products];
      updated[index] = { ...updated[index], [name]: value };
      return { ...prev, products: updated };
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { id: prev.products.length + 1, productName: "", originalPrice: "", discountPrice: "", image: "", quantity:"" }]
    }));
  };

  const handleDeleteProduct = (index) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  // create or update offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.offerName) return alert("Offer name required");

      if (editingId) {
        // update existing offer
        await axios.put(`https://ecomart-backend-2-h3fw.onrender.com/ecomart/updateoffer/${editingId}`, formData);
        alert("Offer Updated Successfully");
        setEditingId(null);
      } else {
        // create new offer
        await axios.post('https://ecomart-backend-2-h3fw.onrender.com/ecomart/postoffers', formData);
        alert("Offer Posted Successfully");
      }

      // reset form and refresh
      setFormData({
        offerName: "",
        percentage: "",
        startDate: "",
        endDate: "",
        products: [{ id: 1, productName: "", originalPrice: "", discountPrice: "", image: "", quantity:"" }]
      });
      setSelectedOffer(null);
      setSearchName('');
      fetchOffers();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save offer");
    }
  };

  // delete offer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecomart-backend-2-h3fw.onrender.com/ecomart/deleteoffer/${id}`);
      alert("Offer Deleted Successfully");
      setOffers(prev => prev.filter(offer => offer._id !== id));
      if (selectedOffer && selectedOffer._id === id) setSelectedOffer(null);
      if (editingId === id) {
        setEditingId(null);
        setFormData({
          offerName: "",
          percentage: "",
          startDate: "",
          endDate: "",
          products: [{ id: 1, productName: "", originalPrice: "", discountPrice: "", image: "", quantity:"" }]
        });
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  // search by name (client-side)
  const showOfferByName = () => {
    if (!searchName.trim()) { alert("Please enter an offer name to search"); return; }
    const name = searchName.trim().toLowerCase();
    const found = offers.find(o => (o.offerName || '').toLowerCase() === name);
    if (!found) { alert("Offer not found"); setSelectedOffer(null); return; }
    setSelectedOffer(found);
  };

  const clearSelection = () => {
    setSelectedOffer(null);
    setSearchName('');
  };

  // load offer into form for editing (does NOT change layout)
  const startEdit = (offer) => {
    setFormData({
      offerName: offer.offerName || '',
      percentage: offer.percentage || '',
      startDate: offer.startDate ? (offer.startDate.split('T')[0] || offer.startDate) : '',
      endDate: offer.endDate ? (offer.endDate.split('T')[0] || offer.endDate) : '',
      products: Array.isArray(offer.products) && offer.products.length > 0
        ? offer.products.map((p, i) => ({ id: i+1, productName: p.productName || '', originalPrice: p.originalPrice || '', discountPrice: p.discountPrice || '', image: p.image || '', quantity: p.quantity || '' }))
        : [{ id: 1, productName: "", originalPrice: "", discountPrice: "", image: "", quantity:"" }]
    });
    setEditingId(offer._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="adminoffers">
      <div className="offers-formcontainer">
        <button className='offersback-btn' onClick={()=>navigate(-1)}>Back</button>
        <h1 className="adminofferpage-heading">{editingId ? "Edit Offer" : "Special Offers Control Panel"}</h1><br/>
        <form className="offers-form" onSubmit={handleSubmit}>
          <input type="text" name="offerName" placeholder="Name of the Offer" className="admin-offersinput" value={formData.offerName} required onChange={handleInputChange} /><br />
          <input type="number" name="percentage" placeholder="Percentage" className="admin-offersinput" value={formData.percentage} required onChange={handleInputChange} min="1"/><br />
          <input type="date" name="startDate" className="admin-offersinput" value={formData.startDate} required onChange={handleInputChange} /><br />
          <input type="date" name="endDate" className="admin-offersinput" value={formData.endDate} required onChange={handleInputChange} /><br />

          <div className="adminoffers-container">
            {formData.products.map((product, index) => (
              <div key={product.id || index} className="adminoffers-productdetails">
                <div className="adminoffers-productslist">
                  <h2 className="product-headcount">Product {index + 1}</h2>
                  <input type="text" name="productName" placeholder="Product Name" className="admin-productoffersinput" value={product.productName} onChange={(e) => handleProductChange(index, e)} required /><br />
                  <input type="number" name="originalPrice" placeholder="Original Price" className="admin-productoffersinput" value={product.originalPrice} onChange={(e) => handleProductChange(index, e)} min="1" required /><br />
                  <input type="number" name="discountPrice" placeholder="Discount Price" className="admin-productoffersinput" value={product.discountPrice} onChange={(e) => handleProductChange(index, e)} min="1" required /><br />
                  <input type="text" name="image" placeholder="Image" className="admin-productoffersinput" value={product.image} onChange={(e) => handleProductChange(index, e)} required /><br />
                  <select name="quantity" value={product.quantity} className="admin-productoffersselect" onChange={(e)=>handleProductChange(index,e)} required>
                    <option value={''}>Select Quantity</option>
                    {quantity.map((x, idx)=>(<option key={idx} value={x}>{x}</option>))}
                  </select>
                  <button type="button" onClick={() => handleDeleteProduct(index)} className="offersproductdelete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Keep buttons and layout exactly like your original */}
          <button onClick={addProduct} className="addproducts-btn">Add Product</button><br />
          <button type="submit" className="postorders-btn">{editingId ? "Update Offer" : "Post Offer"}</button>
        </form>
        <hr/>
      </div>

      <div className="offerslist">
        <h1 className="offerslist-heading">Offers List</h1>

        <div style={{marginBottom: 12}}>
          <input
            type="text"
            placeholder="Enter offer name to view details"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="admin-offersinput"
          />
          <button onClick={showOfferByName} style={{marginLeft:8,height:'30px',width:'100px',backgroundColor:'#0B9F51',color:'white',borderRadius:'5px',border:'none'}}>Show Offer</button>
          <button onClick={() => { setSearchName(''); clearSelection(); }} style={{marginLeft:8,height:'30px',width:'100px',backgroundColor:'#e71b05ff',color:'white',borderRadius:'5px',border:'none'}}>Clear</button>
        </div>

        {/* quick list */}
        {offers.map((x) => (
          <div className="offers-container" key={x._id}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
              <div>
                <h3 style={{margin:0}}>{x.offerName} <small style={{marginLeft:8}}>({x.percentage}%)</small></h3>
                <small>Valid: {x.startDate ? new Date(x.startDate).toLocaleDateString() : '-'} → {x.endDate ? new Date(x.endDate).toLocaleDateString() : '-'}</small>
              </div>
              <div style={{display:'flex', gap:8}}>
                <button onClick={() => { setSelectedOffer(x); setSearchName(x.offerName); }}>View</button>
                <button onClick={() => startEdit(x)}>Edit</button>
                <button onClick={() => handleDelete(x._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}

        {/* Selected offer details - products shown vertically (no design changes to existing layout) */}
        {selectedOffer && (
          <div className="selected-offer-card" style={{marginTop:20, padding:12, border:'1px solid #ddd', borderRadius:8}}>
            <h2 style={{marginTop:0}}>{selectedOffer.offerName} <small> - {selectedOffer.percentage}%</small></h2>
            <p style={{margin:'6px 0'}}>Valid: {selectedOffer.startDate ? new Date(selectedOffer.startDate).toLocaleDateString() : '-'} to {selectedOffer.endDate ? new Date(selectedOffer.endDate).toLocaleDateString() : '-'}</p>

            <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:12}}>
              {Array.isArray(selectedOffer.products) && selectedOffer.products.length > 0 ? selectedOffer.products.map((p, i) => (
                <div key={i} style={{display:'flex', gap:12, alignItems:'center', padding:10, border:'1px solid #eee', borderRadius:6}}>
                  <img src={p.image} alt={p.productName} style={{width:100, height:100, objectFit:'cover', borderRadius:4}} />
                  <div style={{flex:1}}>
                    <h4 style={{margin:'0 0 6px'}}>{p.productName}</h4>
                    <p style={{margin:'0'}}>Qty: {p.quantity}</p>
                    <p style={{margin:'0'}}>MRP: ₹{p.originalPrice}</p>
                    <p style={{margin:'0', fontWeight:600}}>Offer Price: ₹{p.discountPrice}</p>
                  </div>
                </div>
              )) : <p>No products in this offer</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
