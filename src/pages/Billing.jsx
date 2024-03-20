import React, { useState, useEffect } from 'react';
import { database } from './config';
import { collection, getDocs, updateDoc } from 'firebase/firestore';

function Billing() {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(10);
    const [total, setTotal] = useState(0);

    const [firstName, setFirstName] = useState(localStorage.getItem("first_name") + " " + localStorage.getItem("last_name") || "");
    const [addressLine1, setAddressLine1] = useState(localStorage.getItem("addressLine1") || "");
    const [addressLine2, setAddressLine2] = useState(localStorage.getItem("addressLine2") || "");
    const [country, setCountry] = useState(localStorage.getItem("country") || "");
    const [city, setCity] = useState(localStorage.getItem("city") || "");
    const [state, setState] = useState(localStorage.getItem("state") || "");
    const [zip, setZip] = useState(localStorage.getItem("zip") || "");
    const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
    const [order, setOrder] = useState(localStorage.getItem("order") || "");


    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
            let subTotal = 0;
            JSON.parse(cart).forEach((product) => {
                subTotal += product.price * product.quantity;
            });
            setSubtotal(subTotal);
            setTotal(subTotal + shipping);
        }
    }, []);

    const value = collection(database, 'Authentications');
    const uniqueEmail = localStorage.getItem('uniqueEmail');
    const uniquePassword = localStorage.getItem('uniquePassword');

    const handleOrder = async () => {
        const querySnapshot = await getDocs(value);
        querySnapshot.forEach(async (doc) => {
            if (doc.data().email === uniqueEmail && doc.data().password === uniquePassword) {
                const docRef = doc.ref; // Get the document reference
                const docData = doc.data();
                const newDocData = {
                    ...docData,
                    order: JSON.parse(localStorage.getItem('cart')),
                    firstName: firstName,
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    country: country,
                    city: city,
                    state: state,
                    zip: zip,
                    phone: phone,
                };
                await updateDoc(docRef, newDocData);
                window.location.href = '/orderconfirmation';
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);
    return (
        <div className="container mt-5">
            <h1>Billing</h1>
            <div className="row mt-5 d-flex justify-content-between">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                            <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressline1" className="form-label fw-semibold">Address Line 1</label>
                            <input type="text" className="form-control" id="addressline1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressline2" className="form-label fw-semibold">Address Line 2</label>
                            <input type="text" className="form-control" id="addressline2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                        </div>
                        <div className="mb-3 d-flex">
                            <div className="col-md-6 me-1">
                                <label htmlFor="country" className="form-label fw-semibold">Country</label>
                                <input type="text" className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                            <div className="col-md-6 ms-1">
                                <label htmlFor="city" className="form-label fw-semibold">City</label>
                                <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3 d-flex">
                            <div className="col-md-6 me-1">
                                <label htmlFor="state" className="form-label fw-semibold">State</label>
                                <input type="text" className="form-control" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div className="col-md-6 ms-1">
                                <label htmlFor="zip" className="form-label fw-semibold">Zip</label>
                                <input type="text" className="form-control" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
                            <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <h3>Order Summary</h3>
                    <div className="mt-3">
                        {cart.map((product) => (
                            <div className="d-flex justify-content-between mb-3">
                                <div className="d-flex">
                                    <img src={product.image} alt={product.name} width="30" />
                                    <p className="ms-3 fw-bold">{product.title}</p>
                                </div>
                                <p>${product.price * product.quantity}</p>
                            </div>
                        ))}
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td>${subtotal}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td>${shipping}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>${total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <input type='radio' id='card' name='payment' value='bank' className="me-2 mb-2" />
                        <label for='card' className="me-3">Bank</label>
                        <div className="mb-1"></div>
                        <input type='radio' id='cash' name='payment' value='cash' className="me-2 mb-2" checked />
                        <label for='cash' className="me-3">Cash on Delivery</label>
                    </div>
                    <div className="mb-4"></div>
                    <div className="col-md-12 d-flex justify-content-left">
                        <input type="text" className="form-control w-75 me-3" placeholder="Coupon Code" />
                        <button className="btn btn-dark w-50">Apply</button>
                    </div>
                    <div className="mb-4"></div>
                    <button className="btn btn-danger mt-1 w-50 p-3 fw-bold" onClick={handleOrder}>Place Order</button>
                    <div className="mb-4"></div>
                </div>

            </div>
        </div>
    )
}

export default Billing