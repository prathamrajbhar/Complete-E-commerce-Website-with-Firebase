import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

function Navbar() {
    const uniqueEmail = localStorage.getItem('uniqueEmail');
    const uniquePassword = localStorage.getItem('uniquePassword');

    const handleLogout = () => {
        localStorage.removeItem('uniqueEmail');
        localStorage.removeItem('uniquePassword');
        localStorage.clear();
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold">E-commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-center">
                        <li className="nav-item px-4">
                            <Link to="/" className="nav-link active fw-bold">Home</Link>
                        </li>
                        <li className="nav-item px-4">
                            <Link to="/contact" className="nav-link active fw-bold">Contact</Link>
                        </li>
                        <li className="nav-item px-4">
                            <Link to="/about" className="nav-link active fw-bold">About</Link>
                        </li>
                        <li className="nav-item px-4">
                            <Link to="/account" className="nav-link active fw-bold">Account</Link>
                        </li>
                        {uniqueEmail && uniquePassword ? (
                            <li className="nav-item px-4">
                                <Link to="/login" className="nav-link active fw-bold" onClick={handleLogout}>Logout</Link>
                            </li>
                        ) : (
                            <li className="nav-item px-4">
                                <Link to="/login" className="nav-link active fw-bold">Login</Link>
                            </li>
                        )}
                    </ul>
                    <div className="group">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                            <g>
                                <path
                                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                ></path>
                            </g>
                        </svg>
                        <input className="input search-input" type="search" placeholder="Search" />
                    </div>

                    <div className="d-flex">
                        <Link to="/cart" className="mx-2 material-symbols-outlined nav-icons">Favorite</Link>
                        <Link to="/cart" className="mx-2 material-symbols-outlined nav-icons">shopping_cart</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}



export default Navbar