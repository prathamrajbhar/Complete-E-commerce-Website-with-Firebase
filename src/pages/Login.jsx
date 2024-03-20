import React, { useState, useEffect } from 'react'
import { database } from './config'
import { collection, getDocs } from 'firebase/firestore'
import SignupImage from '../assets/image/signup.jpg'

function Login() {
    const [email, setEmail] = useState(localStorage.getItem('uniqueEmail') || '')
    const [password, setPassword] = useState(localStorage.getItem('uniquePassword') || '')
    const value = collection(database, 'Authentications')
    const handleLogin = async () => {
        const querySnapshot = await getDocs(value);
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email && doc.data().password === password) {
                alert('Login Successfully')
                localStorage.setItem('uniqueEmail', doc.data().email)
                localStorage.setItem('uniquePassword', doc.data().password)
                getDataBack();
            }
            else{
                alert('Invalid Email or Password')
            }
        });
    }
    useEffect(() => {
        const localEmail = localStorage.getItem('localEmail');
        const localPassword = localStorage.getItem('loginPassword');
        if (localEmail && localPassword) {
            setEmail(localEmail);
            setPassword(localPassword);
        }
    }, []);

    const getDataBack = async () => {
        const querySnapshot = await getDocs(value);
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email && doc.data().password === password) {
                localStorage.setItem('first_name', doc.data().firstName)
                localStorage.setItem('last_name', doc.data().lastName)
                localStorage.setItem('uniqueEmail', doc.data().email)
                localStorage.setItem('uniquePassword', doc.data().password)
                localStorage.setItem('addressLine1', doc.data().addressLine1)
                localStorage.setItem('addressLine2', doc.data().addressLine2)
                localStorage.setItem('city', doc.data().city)
                localStorage.setItem('state', doc.data().state)
                localStorage.setItem('zip', doc.data().zip)
                localStorage.setItem('country', doc.data().country)
                localStorage.setItem('phone', doc.data().phone)
                localStorage.setItem('cart', JSON.stringify(doc.data().order))
                alert("Data Fetched Successfully");
                if (doc.data().addressLine1 === '') {
                    window.location.href = '/';
                } else {
                    window.location.href = '/account';
                }
            }
        });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5">
                    <img src={SignupImage} className="img-fluid rounded" alt="signup" />
                </div>
                <div className="col-md-6">
                    <div className="mt-5">
                        <p className="fs-3 fw-bold text-center">Login to your Account</p>
                        <p className="text-left fw-semibold">Enter your details below</p>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">Email or Phone Number</label>
                                <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                <input type="text" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3 text-center">
                                <button type="button" className="btn btn-danger w-75 p-3 fw-bold" onClick={handleLogin}>Login</button>
                            </div>
                            <div className="mb-3 text-center">
                                <p className="fw-semibold">Don't have an account? <a href="/signup">Signup</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login