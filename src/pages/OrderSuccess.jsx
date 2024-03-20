import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from './config';
function OrderSuccess() {
    const [cart, setCart] = useState([]);
    const [orderDate, setOrderDate] = useState('');
    const [address, setAddress] = useState({});
    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
        }
        const date = new Date().toDateString();
        setOrderDate(date);
        handleOrder();
    }, []);

    const value = collection(database, 'Authentications');
    const uniqueEmail = localStorage.getItem('uniqueEmail');
    const uniquePassword = localStorage.getItem('uniquePassword');
    const handleOrder = async () => {
        const querySnapshot = await getDocs(value);
        querySnapshot.forEach(async (doc) => {
            if (doc.data().email === uniqueEmail && doc.data().password === uniquePassword) {
                setAddress({
                    addressLine1: doc.data().addressLine1,
                    addressLine2: doc.data().addressLine2,
                    city: doc.data().city,
                    state: doc.data().state,
                    country: doc.data().country,
                    zip: doc.data().zip,
                    phone: doc.data().phone
                });
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: '120px', height: '120px' }}>
                    <span className="material-symbols-outlined text-light" style={{ fontSize: '80px' }}>
                        check
                    </span>
                </div>
                <h1 className="fw-bold mt-4">Thank you for your order</h1>
                <p className="mt-3">The order confirmation email with details of your order has been sent to you</p>
                <p className="badge bg-success text-wrap p-2 mt-3">
                    Order Date: {orderDate}
                </p>
            </div>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-outline-primary me-2" onClick={() => window.print()}>
                    <span class="material-symbols-outlined">
                        print
                    </span>
                </button>
                <button className="btn btn-outline-warning me-2" onClick={() => window.location.href = '/contact'}>
                    <span class="material-symbols-outlined">
                        email
                    </span>
                </button>
                <button className="btn btn-outline-danger ms-2" onClick={() => window.location.href = '/download'}>
                    <span class="material-symbols-outlined">
                        download
                    </span>
                </button>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Shipping Address</h5>
                            <p className="card-text">
                                {address.addressLine1} <br />
                                {address.addressLine2} <br />
                                {address.city}, {address.state} <br />
                                {address.country} <br />
                                Phone: {address.phone}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Billing Address</h5>
                            <p className="card-text">
                                {address.addressLine1} <br />
                                {address.addressLine2} <br />
                                {address.city}, {address.state} <br />
                                {address.country} <br />
                                Phone: {address.phone}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            <table className="table">
                                <tbody>
                                    {cart.map((product, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={product.image} alt={product.title} width="30" />
                                            </td>
                                            <td>{product.title}</td>
                                            <td>${product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>${product.price * product.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Order Total</h5>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td>$0.00</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Payment Method</h5>
                            <p className="card-text">Credit Card</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
