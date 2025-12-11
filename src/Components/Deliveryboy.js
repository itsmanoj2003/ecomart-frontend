import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';

export default function Deliveryboy() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryBoyName, setDeliveryBoyName] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/ecomart/getorders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeliveredClick = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const confirmDelivery = () => {
    if (deliveryBoyName.trim() === '') {
      alert('Please enter your name to confirm delivery.');
      return;
    }

    axios
      .put(`http://localhost:3001/ecomart/mark-delivered/${selectedOrderId}`, {
        deliveredBy: deliveryBoyName,
      })
      .then(() => {
        alert(`Order marked as delivered by ${deliveryBoyName} ✅`);
        setOrders((prev) =>
          prev.map((order) =>
            order._id === selectedOrderId
              ? { ...order, status: 'Delivered', deliveredBy: deliveryBoyName }
              : order
          )
        );
      })
      .catch((err) => console.log(err));

    setIsModalOpen(false);
    setDeliveryBoyName('');
    setSelectedOrderId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeliveryBoyName('');
    setSelectedOrderId(null);
  };

  return (
    <div className="orders-container">
      <div className="orderpage-top">
        <h1 className="orders-title">EcoMart's Express Agent ... 🛵</h1>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bill">
            <h2 className="bill-title">EcoMart Supermarket</h2>
            <p className="bill-subtitle">Thank you for shopping with us!</p>
            <hr />

            <table className="users-detailable">
              <tbody>
                <tr>
                  <td>
                    <strong>Name:</strong>
                  </td>
                  <td>{order.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Mobile:</strong>
                  </td>
                  <td>{order.mobile}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Address:</strong>
                  </td>
                  <td>{order.address}</td>
                </tr>
                <tr>
                  <td>
                    <strong>City:</strong>
                  </td>
                  <td>{order.city}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Payment Mode:</strong>
                  </td>
                  <td>{order.paymentMode}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Order Time:</strong>
                  </td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                </tr>
                {order.status === 'Delivered' && (
                  <tr>
                    <td>
                      <strong>Delivered By:</strong>
                    </td>
                    <td>{order.deliveredBy}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <table className="bill-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.pname}</td>
                    <td>{item.quantity}</td>
                    <td>Rs.{item.pprice}</td>
                    <td>Rs.{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr />
            <h3 className="bill-total">Total Amount: Rs.{order.total}</h3>

            {order.status !== 'Delivered' && (
              <button
                className="delivered-btn"
                onClick={() => handleDeliveredClick(order._id)}
              >
                ✅ Delivered
              </button>
            )}

            <p className="bill-footer">Visit Again! 😊</p>
          </div>
        ))
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter Your Name</h3>
            <input
              type="text"
              value={deliveryBoyName}
              onChange={(e) => setDeliveryBoyName(e.target.value)}
              placeholder="Your name"
            />
            <div className="modal-buttons">
              <button onClick={confirmDelivery}>Confirm</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
