import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { useNavigate } from 'react-router-dom';

export default function AdminOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        axios.get('https://api.ecomartsangai.in/ecomart/getorders')
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://api.ecomartsangai.in/ecomart/deleteorder/${id}`)
            .then(() => {
                alert('Order deleted successfully');
                fetchOrders();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="orders-container">
            <div className='orderpage-top'>
                <h1 className="orders-title">All Orders</h1>
                <button className='back-btn' onClick={() => navigate(-1)}>Back</button>
            </div>

            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                orders.map(order => {

                    const gstTotal = order.gstTotal || 0;
                    const deliveryCharge = 30;
                    const grandTotal = order.total + gstTotal + deliveryCharge;

                    return (
                        <div key={order._id} className="bill">
                            <h2 className="bill-title">EcoMart Supermarket</h2>
                            <p className="bill-subtitle">Thank you for shopping with us!</p>
                            <hr />

                            <table className='users-detailable'>
                                <tbody>
                                    <tr><td><strong>Bill Number:</strong></td><td>{order.billNumber}</td></tr>
                                    <tr><td><strong>Name:</strong></td><td>{order.name}</td></tr>
                                    <tr><td><strong>Mobile:</strong></td><td>{order.mobile}</td></tr>
                                    <tr><td><strong>Address:</strong></td><td>{order.address}</td></tr>
                                    <tr><td><strong>City:</strong></td><td>{order.city}</td></tr>
                                    <tr><td><strong>Payment Mode:</strong></td><td>{order.paymentMode}</td></tr>
                                    {order.paymentMode == 'gpay' ? <tr><td><strong>Transaction Id:</strong></td><td>{order.paymentId}</td></tr>:''}
                                    <tr><td><strong>Order Time:</strong></td><td>{new Date(order.date).toLocaleString()}</td></tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td style={{ color: order.status === "Delivered" ? "green" : "orange" }}>
                                            {order.status || "Pending"}
                                        </td>
                                    </tr>
                                    {order.status === "Delivered" && (
                                        <tr>
                                            <td><strong>Delivered By:</strong></td>
                                            <td>{order.deliveredBy}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* ITEMS + TOTALS TABLE */}
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
                                            <td>{item.itemname}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rs.{item.price}</td>
                                            <td>Rs.{item.subtotal}</td>
                                        </tr>
                                    ))}

                                    {/* TOTAL ROWS */}
                                    <tr>
                                        <td colSpan="3">Net Total</td>
                                        <td>Rs.{order.total}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">GST Amount</td>
                                        <td>Rs.{gstTotal}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Delivery Charge</td>
                                        <td>Rs.{deliveryCharge}</td>
                                    </tr>
                                    <tr style={{border:'0px'}}>
                                        <td colSpan="3" style={{border:'0px',color:'red'}}><strong>Grand Total</strong></td>
                                        <td style={{border:'0px',color:'red'}}><strong>Rs.{grandTotal}</strong></td>
                                    </tr>
                                </tbody>
                            </table>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(order._id)}
                            >
                                🗑 Delete Order
                            </button>

                            <p className="bill-footer">Visit Again! 😊</p>
                        </div>
                    );
                })
            )}
        </div>
    );
}
