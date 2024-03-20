import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ProductDetails.css';
import { database } from './config'
import { addDoc, collection } from 'firebase/firestore'

const ProductDetails = () => {
    const { productId } = useParams(); // Get the productId from route params
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>No product found</p>;

    const value = collection(database, 'Cart')



    const BuyNow = async () => {
        let cart = localStorage.getItem('cart');
        if (!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        cart.push({ ...product, quantity });
        await addDoc(value, {
            order: {
                cart: cart.map((p) => {
                    return {
                        id: p.id,
                        title: p.title,
                        price: p.price,
                        image: p.image,
                        quantity: p.quantity,
                    };
                }),
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));

        window.location.href = '/cart';
    };

    const handleAddToCart = async () => {
        let cart = localStorage.getItem('cart');
        if (!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        cart.push({ ...product, quantity });
        await addDoc(value, {
            order: {
                cart: cart.map((p) => {
                    return {
                        id: p.id,
                        title: p.title,
                        price: p.price,
                        image: p.image,
                        quantity: p.quantity,
                    };
                }),
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart');
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 text-center">
                    <img src={product.image} alt={product.title} className="img-fluid" style={{ height: '400px' }} />
                </div>
                <div className="col-md-6">
                    <p className="fs-4 fw-bold">{product.title}</p>
                    <div className="d-flex">
                        {Array.from({ length: Math.floor(product.rating.rate) + 1 }).map((_, index) => (
                            <span className="material-symbols-outlined fs-7 text-warning" key={index}>
                                star
                            </span>
                        ))}
                        <span className="fs-6 fw-semibold ms-2 text-muted">({product.rating.count}) Reviews</span>
                        | <p className='fs-6 fw-semibold ms-2 text-success'>In Stock</p>
                    </div>
                    <p className="fs-3 text-danger" style={{ marginBottom: '20px' }}>${product.price}</p>
                    <span className="category_tag">{product.category}</span>
                    <p className="fs-6 fw-semibold" style={{ textTransform: 'capitalize' }}>{product.description}</p>
                    <hr />
                    <div className="d-flex mt-5 justify-content-between">
                        <div className="d-flex">
                            <button className="quantityButtonMinus" onClick={() => setQuantity(quantity - 1)}>-</button>
                            <input type="text" value={quantity} className="quantityInput" />
                            <button className="quantityButtonPlus" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button className="btn btn-danger fw-bold fs-6" style={{ padding: '10px 20px' }} onClick={BuyNow}>Buy Now</button>
                        <button className="mx-2 material-symbols-outlined cardButton" style={{ padding: '10px 20px' }} onClick={handleAddToCart}>add_shopping_cart</button>
                    </div>
                    <div className="mt-5">
                        <div className="d-flex deal-card">
                            <span className="material-symbols-outlined" style={{ fontSize: '60px' }}>
                                local_shipping
                            </span>
                            <div className="ms-4">
                                <p className="fs-6 fw-semibold mb-2">Free Delivery</p>
                                <p className="fs-8 text-semibold">Enter your pincode to check delivery</p>
                            </div>
                        </div>
                        <div className="d-flex deal-card">
                            <span className="material-symbols-outlined" style={{ fontSize: '60px' }}>
                                autorenew
                            </span>
                            <div className="ms-4">
                                <p className="fs-6 fw-semibold mb-2">Return Delivery</p>
                                <p className="fs-8 text-semibold">Free 30 Days Delivery Returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
