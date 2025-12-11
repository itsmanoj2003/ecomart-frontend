import { useCart } from './Cartcontext';
import './Cart.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import gpayqr from '../Components/assets/gpay.jpg';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.pprice * item.quantity, 0);

  const [msg, setMsg] = useState('Your Cart is Empty');
  const [showQRPopup, setShowQRPopup] = useState(false);

  const [orderdata, setOrderdata] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    paymentMode: 'cod', // default
    paymentId: '', // transaction id when using gpay
    items: [],
    total: 0
  });

  // Show popup when user selects online payment
  useEffect(() => {
    if (orderdata.paymentMode === 'gpay') {
      setShowQRPopup(true);
    } else {
      setShowQRPopup(false);
      setOrderdata(prev => ({ ...prev, paymentId: '' }));
    }
  }, [orderdata.paymentMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderdata(prev => ({ ...prev, [name]: value }));
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          const address = res.data.display_name || '';
          const city = res.data.address?.city || res.data.address?.town || res.data.address?.village || '';
          setOrderdata(prev => ({ ...prev, address, city }));
        } catch (err) {
          console.error(err);
          alert("Failed to fetch location.");
        }
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  // simple app-open helpers (open app scheme first, fallback to generic upi uri)
  const openGPay = () => {
    // opens Google Pay app if installed, otherwise fallback to UPI chooser
    const upiFallback = `upi://pay?pa=ecomartsangai@okicici&pn=Eco Mart&am=${totalPrice}&cu=INR`; // blank pa/pn so it only opens chooser/app
    const intent = `intent://pay?${upiFallback.split('?')[1]}#Intent;package=com.google.android.apps.nbu.paisa.user;scheme=upi;end`;
    window.location.href = intent;
    setTimeout(() => { window.location.href = upiFallback; }, 700);
  };

  const openPhonePe = () => {
    // opens PhonePe app if installed, otherwise fallback to UPI chooser
    const upiFallback = `upi://pay?pa=ecomartsangai@okicici&pn=Eco Mart&am=${totalPrice}&cu=INR`;
    const intent = `intent://pay?${upiFallback.split('?')[1]}#Intent;package=com.phonepe.app;scheme=upi;end`;
    window.location.href = intent;
    setTimeout(() => { window.location.href = upiFallback; }, 700);
  };

  const closePopup = () => {
    setShowQRPopup(false);
    // keep paymentMode as 'gpay' so user still has selected online payment OR set back to cod:
    // if you want to reset selection when popup closed, uncomment the next line:
    // setOrderdata(prev => ({ ...prev, paymentMode: 'cod' }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!orderdata.name || !orderdata.mobile || !orderdata.address || !orderdata.city || !orderdata.paymentMode) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (orderdata.paymentMode === 'gpay' && !orderdata.paymentId) {
      // If you want to force paste TXN id, keep this; else remove to allow redirection-only flow.
      alert("Please enter the transaction ID for online payment.");
      return;
    }

    const cityName = orderdata.city.trim().toLowerCase();
    if (cityName !== 'sankarankovil' && cityName !== 'snkl' && cityName !== 'sangai' && totalPrice <= 1000) {
      alert("Minimum order amount must be more than ₹1000 for your city.");
      return;
    }

    const updatedOrder = {
      name: orderdata.name,
      mobile: orderdata.mobile,
      address: orderdata.address,
      city: orderdata.city,
      paymentMode: orderdata.paymentMode,
      paymentId: orderdata.paymentId || '',
      items: cart.map(item => ({
        pname: item.pname,
        pprice: item.pprice,
        quantity: item.quantity,
        subtotal: item.pprice * item.quantity
      })),
      total: totalPrice
    };

    console.log("Payload about to send:", updatedOrder);

    try {
      const res = await axios.post(
        "https://ecomart-backend-2-h3fw.onrender.com/ecomart/order",
        JSON.stringify(updatedOrder),
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Server response:", res.data);
      alert("Order Placed Successfully!");
      clearCart();
      setMsg('Happy Shopping! Your Order is Placed 🌟');
      localStorage.setItem("latestOrder", JSON.stringify(updatedOrder));
      navigate('/ordersuccess');
    } catch (error) {
      console.error("Order Failed:", error.response?.data || error.message);
      alert("Order Failed! Try Again.");
    }
  };

  return (
    <div className='cart'>

      <div className='cart-deliverymsg'>
                <marquee behavior="scroll" direction="left">
                    Home Delivery available for the areas around 15km from Sankarankovil. Free Delivery for Sankarankovil only
                </marquee>
            </div>

      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="empty-cart">{msg}</p>
        ) : (
          <form className='cart-form' onSubmit={handleOrder}>
            <input
              type='text'
              name="name"
              placeholder='Enter Your Name'
              className='cartform-name'
              onChange={handleChange}
              value={orderdata.name}
              required
            /><br />

            <input
              type='tel'
              name="mobile"
              placeholder='Enter Your Mobile Number'
              className='cart-mobilenumber'
              onChange={handleChange}
              value={orderdata.mobile}
              required
            /><br />

            <textarea
              name="address"
              placeholder="Enter Your Address & Town Name"
              className="cart-address"
              onChange={handleChange}
              value={orderdata.address}
              required
              rows={3}
            /><br />

            <input
              type='text'
              name="city"
              placeholder='Enter Your Town'
              className='cart-city'
              onChange={handleChange}
              value={orderdata.city}
              required
            /><br />

            <button type="button" className="get-location-btn" onClick={handleLocation}>
              🎯 Use My Location
            </button><br />

            {/* Payment Mode */}
            <div className="payment-mode-section">
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  value="cod"
                  checked={orderdata.paymentMode === 'cod'}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>

              <label style={{ marginLeft: '20px' }}>
                <input
                  type="radio"
                  name="paymentMode"
                  value="gpay"
                  checked={orderdata.paymentMode === 'gpay'}
                  onChange={handleChange}
                />
                Online Payment (GPay)
              </label>
            </div><br />

            {/* Popup is controlled by showQRPopup */}
            {showQRPopup && (
              <div className="qr-popup">
                <div className="qr-popup-content">
                  <button className="close-popup" type="button" onClick={closePopup}>✕</button>
                  <h3 className="qr-title">Scan to Pay / Open App</h3>
                  <img src={gpayqr} alt="GPay QR" className="qr-image-large" />

                  <div className="upi-buttons">
                    <button
                      type="button"
                      className="upi-btn gpay"
                      onClick={openGPay}
                    >
                      Open GPay
                    </button>

                    <button
                      type="button"
                      className="upi-btn phonepe"
                      onClick={openPhonePe}
                    >
                      Open PhonePe
                    </button>
                  </div>

                  <p className="qr-note">If payment app doesn't open, scan the QR or use your UPI app to pay manually.</p>
                </div>
              </div>
            )}

            

            {/* Cart Items */}
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.pimg} className="cart-image" alt={item.pname} />
                  <div className="cart-item-details">
                    <h3>{item.pname}</h3>
                    <p>Price: Rs.{item.pprice}</p>
                    <div className="quantity-container">
                      <button type="button" className="qty-btn" onClick={() => removeFromCart(item._id)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button type="button" className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                    <p className="subtotal">Subtotal: Rs.{item.pprice * item.quantity}</p>
                    <button type="button" className="remove-btn" onClick={() => removeFromCart(item._id, true)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="total-price">Total Price: Rs.{totalPrice}</h2>
            <button type="submit" className='order-btn' onClick={() => window.open("https://wa.me/917200260036", "_blank")}>Whatsapp</button><br/>
            <label>Share the Payment Screenshort in Whatsappp Before Placing Order ☝️</label><br/>
            <button type="submit" className='order-btn'>Place An Order</button>
          </form>
        )}
      </div>
    </div>
  );
}
