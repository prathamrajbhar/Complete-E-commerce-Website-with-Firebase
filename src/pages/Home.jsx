import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom' // Import Link from react-router-dom
import '../css/Home.css'
import axios from 'axios'

function Home() {
  return (
    <div className="container mt-5">
      <FreshSales />
      <Categories />
    </div>
  )
}

const FreshSales = () => {
  const history = useHistory();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const API_URL = 'https://fakestoreapi.com/products'

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        console.log('Response:', response.data);
        setProducts(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError('Error fetching data')
        setLoading(false)
      })
  }, [])

  const handleBuyNow = (productId) => {
    history.push(`/productdetails/${productId}`);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 d-flex">
          <span className="spacer"></span>
          <p className="fs-4 fw-bold d-flex align-items-center h-100 px-2">Fresh Sales</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="horizontal-scroll-container">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {products.slice(0, 7).map(product => (
            <div className="col-md-3" key={product.id}>
              <div className="card border-0 h-100">
                <img src={product.image} alt={product.title} className="card-img-top" style={{ height: '180px', width: '180px', margin: 'auto' }} />
                <div className="card-body">
                  <p className="card-title fs-8 fw-semibold">{product.title}</p>
                  <p className="card-text fs-6 fw-semibold text-danger">${product.price}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary">Add to Cart</button>
                    <Link to={`/productdetails/${product.id}`} className="btn btn-primary" onClick={() => handleBuyNow(product.id)}>Buy Now</Link> {/* Use Link component */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Link to="/products" className="btn btn-primary">View All Products</Link>
      </div>
    </div>
  )
}

const Categories = () => {
  return (
    <div className="container mt-5">
    </div>
  )
}

export default Home
