import React, { useState, useEffect } from 'react';

function Cart() {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(10);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let cartData = localStorage.getItem('cart');
        if (cartData) {
            cartData = JSON.parse(cartData);
            setCart(cartData);
            let subTotal = 0;
            cartData.forEach((product) => {
                subTotal += product.price * product.quantity;
            });
            setSubtotal(subTotal);
            setTotal(subTotal + shipping);
        }
    }, []);


    const removeProduct = (product) => {
        let cartData = localStorage.getItem('cart');
        if (cartData) {
            cartData = JSON.parse(cartData);
            const newCart = cartData.filter((p) => p.id !== product.id);
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.name} width="50" />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td><input type="number" value={product.quantity} className="form-control w-25" /></td>
                                    <td>{product.price * product.quantity}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => removeProduct(product)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="col-md-12 d-flex justify-content-between">
                        <button className="btn btn-danger">Return to Shop</button>
                        <button className="btn btn-light me-3 border">Update Cart</button>
                    </div>
                    <div className="col-md-12 d-flex justify-content-end">
                        <table className="table w-25 mt-5">
                            <tbody>
                                <td className="fw-bold">Cart Total</td>
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
                                <tr className="text-center mt-3 w-100">
                                    <td><button className="btn btn-danger mt-1 w-100" onClick={() => window.location.href = '/billing'}>Proceed to Checkout</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cart;
