import React, { useEffect, useState } from 'react'
import '../css/Signup.css'
import SignupImage from '../assets/image/signup.jpg'
import { database } from './config'
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const value = collection(database, 'Authentications')

  const handleSignup = async () => {
    const q = query(value, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert('Email already exists');
      return;
    }

    try {
      await addDoc(value, {
        email: email,
        password: password
      });
      alert('Signup Successful');
      localStorage.setItem('uniqueEmail', email);
      localStorage.setItem('uniquePassword', password);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('An error occurred while signing up. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5">
          <img src={SignupImage} className="img-fluid rounded" alt="signup" />
        </div>
        <div className="col-md-6">
          <div className="mt-5">
            <p className="fs-3 fw-bold text-center">Create an Account</p>
            <p className="text-left fw-semibold">Enter your details below</p>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email or Phone Number</label>
                <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3 text-center">
                <button type="button" className="btn btn-danger w-75 p-3 fw-bold" onClick={handleSignup}>Create Account</button>
              </div>
              <div className="mb-3 text-center">
                <p className="fw-semibold">Already have an account? <Link to="/login">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
