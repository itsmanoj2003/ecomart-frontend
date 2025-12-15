// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './Orders.css';
// import { useNavigate } from 'react-router-dom';

// export default function AdminOrders() {

//     const navigate=useNavigate()

//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3001/ecomart/getorders')
//             .then(res => setOrders(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     const handleDelete = (id) => {
//             axios.delete(`http://localhost:3001/ecomart/deleteorder/${id}`)
//                 .then(() => {
//                     alert('Order deleted Successfully')
//                 })
//                 .catch(err => console.log(err));
//     };

//     return (
//         <div className="orders-container">
//             <div className='orderpage-top'>
//             <h1 className="orders-title">All Orders</h1>
//             <button className='back-btn' onClick={()=>navigate(-1)}>Back</button>
//             </div>
//             {orders.length === 0 ? (
//                 <p className="no-orders">No orders found.</p>
//             ) : (
//                 orders.map(order => (
//                     <div key={order._id} className="bill">
//                         <h2 className="bill-title">EcoMart Supermarket</h2>
//                         <p className="bill-subtitle">Thank you for shopping with us!</p>
//                         <hr/>

//                         <table className='users-detailable'>
//                             <tr>
//                                 <td><p className='ordereduser-details'><strong>Name:</strong></p></td>
//                                 <td><p className='ordereduser-details'>{order.name}</p></td>
//                             </tr>
//                             <tr>
//                                 <td><p className='ordereduser-details'><strong>Mobile:</strong></p></td>
//                                 <td><p className='ordereduser-details'>{order.mobile}</p></td>
//                             </tr>
//                             <tr>
//                                 <td><p className='ordereduser-details'><strong>Address:</strong></p></td>
//                                 <td><p className='ordereduser-details'>{order.address}</p></td>
//                             </tr>
//                             <tr>
//                                 <td><p className='ordereduser-details'><strong>Order Time:</strong></p></td>
//                                 <td><p className='ordereduser-details'>{new Date(order.date).toLocaleString()}</p></td>
//                             </tr>
//                         </table>

//                         <table className="bill-table">
//                             <thead>
//                                 <tr>
//                                     <th>Item</th>
//                                     <th>Qty</th>
//                                     <th>Price</th>
//                                     <th>Subtotal</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {order.items.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{item.pname}</td>
//                                         <td>{item.quantity}</td>
//                                         <td>Rs.{item.pprice}</td>
//                                         <td>Rs.{item.subtotal}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <hr />
//                         <h3 className="bill-total">Total Amount: Rs.{order.total}</h3>
//                         <button className="delete-btn" onClick={() => handleDelete(order._id)}>🗑 Delete Order</button>
//                         <p className="bill-footer">Visit Again! 😊</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { useNavigate } from 'react-router-dom';

export default function AdminOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        axios.get('https://ecomart-backend-2-h3fw.onrender.com/ecomart/getorders')
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://ecomart-backend-2-h3fw.onrender.com/ecomart/deleteorder/${id}`)
            .then(() => {
                alert('Order deleted successfully');
                fetchOrders(); // refresh list
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
                orders.map(order => (
                    <div key={order._id} className="bill">
                        <h2 className="bill-title">EcoMart Supermarket</h2>
                        <p className="bill-subtitle">Thank you for shopping with us!</p>
                        <hr />

                        <table className='users-detailable'>
                            <tbody>
                                <tr>
                                    <td><strong>Name:</strong></td>
                                    <td>{order.name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mobile:</strong></td>
                                    <td>{order.mobile}</td>
                                </tr>
                                <tr>
                                    <td><strong>Address:</strong></td>
                                    <td>{order.address}</td>
                                </tr>
                                <tr>
                                    <td><strong>City:</strong></td>
                                    <td>{order.city}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payment Mode:</strong></td>
                                    <td>{order.paymentMode}</td>
                                </tr>
                                <tr>
                                    <td><strong>Order Time:</strong></td>
                                    <td>{new Date(order.date).toLocaleString()}</td>
                                </tr>
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
                        <button className="delete-btn" onClick={() => handleDelete(order._id)}>🗑 Delete Order</button>
                        <p className="bill-footer">Visit Again! 😊</p>
                    </div>
                ))
            )}
        </div>
    );
}
