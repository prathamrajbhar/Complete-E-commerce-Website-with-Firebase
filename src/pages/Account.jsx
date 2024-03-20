import React, { useState, useEffect } from 'react'
import { database } from './config'
import { collection, getDocs, updateDoc } from 'firebase/firestore'

function Account() {
    return (
        <div className="container mt-5">
            <h1>Account</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <a href="#my-profile" className="list-group-item list-group-item-action active" data-bs-toggle="pill">My Profile</a>
                        <a href="#address-book" className="list-group-item list-group-item-action" data-bs-toggle="pill">Address Book</a>
                        <a href="#my-payments" className="list-group-item list-group-item-action" data-bs-toggle="pill">My Payments</a>
                        <a href="#my-orders" className="list-group-item list-group-item-action" data-bs-toggle="pill">My Orders</a>
                        <a href="#my-cancelations" className="list-group-item list-group-item-action" data-bs-toggle="pill">My Cancelations</a>
                        <a href="#my-wishlist" className="list-group-item list-group-item-action" data-bs-toggle="pill">My Wishlist</a>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div id="my-profile" className="tab-pane fade show active">
                            <MyProfile />
                        </div>
                        <div id="address-book" className="tab-pane fade">
                            <AddressBook />
                        </div>
                        <div id="my-payments" className="tab-pane fade">
                            <MyPayments />
                        </div>
                        <div id="my-orders" className="tab-pane fade">
                            <MyOrders />
                        </div>
                        <div id="my-cancelations" className="tab-pane fade">
                            <MyCancelations />
                        </div>
                        <div id="my-wishlist" className="tab-pane fade">
                            <MyWishlist />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MyProfile = () => {
    const [firstName, setFirstName] = useState(localStorage.getItem("first_name") || "")
    const [lastName, setLastName] = useState(localStorage.getItem("last_name") || "")
    const [email, setEmail] = useState(localStorage.getItem("uniqueEmail") || "")
    const [phone, setPhone] = useState(localStorage.getItem("phone") || "")
    const [password, setPassword] = useState(localStorage.getItem("uniquePassword") || "")


    const handleSaveChanges = async () => {
        const value = collection(database, 'Authentications')
        const uniqueEmail = localStorage.getItem('uniqueEmail');
        const uniquePassword = localStorage.getItem('uniquePassword');

        const querySnapshot = await getDocs(value);
        querySnapshot.forEach(async (doc) => {
            if (doc.data().email === uniqueEmail && doc.data().password === uniquePassword) {
                const docRef = doc.ref; // Get the document reference
                const docData = doc.data(); // Get the document data
                const newDocData = {
                    ...docData,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,

                    // password: password,
                    // newPassword: newPassword,
                    // confirmPassword: confirmPassword
                }
                await updateDoc(docRef, newDocData); // Update the document using the document reference
                console.log('Profile Updated Successfully');
            }
        });
    }


    return (
        <div className="container shadow p-5">
            <p className="fs-4 fw-bold text-danger">Edit Your Profile</p>
            <form>
                <div className="mb-3 d-flex">
                    <div className="col-md-6 me-3">
                        <label for="firstName" className="form-label fw-semibold">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="col-md-6 ms-3">
                        <label for="lastName" className="form-label fw-semibold">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3 d-flex">
                    <div className="col-md-6 me-3">
                        <label for="email" className="form-label fw-semibold">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="johndeo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-6 ms-3">
                        <label for="phone" className="form-label fw-semibold">Phone</label>
                        <input type="text" className="form-control" id="phone" placeholder="+91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
                {/* <div className="mb-3 form-group">
                    <label for="password" className="form-label fw-semibold">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Current Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3 form-group">
                    <label for="newPassword" className="form-label fw-semibold">New Password</label>
                    <input type="password" className="form-control" id="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="mb-3 form-group">
                    <label for="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div> */}
                <div className="mb-3 form-group text-end">
                    <a href="/" className="text-decoration-none text-dark fw-semibold">Cancel</a>
                    <button type="button" className="btn btn-danger ms-3" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

const AddressBook = () => {
    const [addressLine1, setAddressLine1] = useState(localStorage.getItem("addressLine1") || "")
    const [addressLine2, setAddressLine2] = useState(localStorage.getItem("addressLine2") || "")
    const [country, setCountry] = useState(localStorage.getItem("country") || "")
    const [city, setCity] = useState(localStorage.getItem("city") || "")
    const [state, setState] = useState(localStorage.getItem("state") || "")
    const [zip, setZip] = useState(localStorage.getItem("zip") || "")
    const [phone, setPhone] = useState(localStorage.getItem("phone") || "")


    const handleSaveChanges = async () => {
        const value = collection(database, 'Authentications')
        const uniqueEmail = localStorage.getItem('uniqueEmail');
        const uniquePassword = localStorage.getItem('uniquePassword');

        const querySnapshot = await getDocs(value);
        querySnapshot.forEach(async (doc) => {
            if (doc.data().email === uniqueEmail && doc.data().password === uniquePassword) {
                const docRef = doc.ref; // Get the document reference
                const docData = doc.data(); // Get the document data
                const newDocData = {
                    ...docData,
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    country: country,
                    city: city,
                    state: state,
                    zip: zip,
                    phone: phone
                }
                await updateDoc(docRef, newDocData); // Update the document using the document reference
                console.log('Address Updated Successfully');
            }
        });
    }

    return (
        <div className="container shadow p-5">
            <p className="fs-4 fw-bold text-danger">Edit Your Address</p>
            <form>
                <div className="mb-3">
                    <label for="addressline1" className="form-label fw-semibold">Address Line 1</label>
                    <input type="text" className="form-control" id="addressline1" placeholder="123 Main Street" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="addressline2" className="form-label fw-semibold">Address Line 2</label>
                    <input type="text" className="form-control" id="addressline2" placeholder="Springfield, IL 62701" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                </div>
                <div className="mb-3 d-flex">
                    <div className="col-md-6 me-1">
                        <label for="country" className="form-label fw-semibold">Country</label>
                        <input type="text" className="form-control" id="country" placeholder="United States" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className="col-md-6 ms-1">
                        <label for="city" className="form-label fw-semibold">City</label>
                        <input type="text" className="form-control" id="city" placeholder="Springfield" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3 d-flex">
                    <div className="col-md-6 me-1">
                        <label for="state" className="form-label fw-semibold">State</label>
                        <input type="text" className="form-control" id="state" placeholder="IL" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="col-md-6 ms-1">
                        <label for="zip" className="form-label fw-semibold">Zip</label>
                        <input type="text" className="form-control" id="zip" placeholder="62701" value={zip} onChange={(e) => setZip
                            (e.target.value)} />
                    </div>
                </div>
                <div className="mb-3 form-group text-end">
                    <a href="/" className="text-decoration-none text-dark fw-semibold">Cancel</a>
                    <button type="button" className="btn btn-danger ms-3" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

const MyPayments = () => {
    return (
        <div>My Payments</div>
    )
}

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const value = collection(database, 'Authentications');
    const uniqueEmail = localStorage.getItem('uniqueEmail');
    const uniquePassword = localStorage.getItem('uniquePassword');

    useEffect(() => {
        const fetchOrders = async () => {
            const querySnapshot = await getDocs(value);
            querySnapshot.forEach(async (doc) => {
                if (doc.data().email === uniqueEmail && doc.data().password === uniquePassword) {
                    setOrders(doc.data().orders);
                }
            });
        };
        fetchOrders();
    }, []);

    return (
        <div className="container shadow p-5">
            <p className="fs-4 fw-bold text-danger">My Orders</p>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {orders && orders.map((order, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Order ID: {order.orderId}</h5>
                                <p className="card-text">
                                    Order Date: {order.orderDate} <br />
                                    Total Amount: {order.totalAmount}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const MyCancelations = () => {
    return (
        <div>My Cancelations</div>
    )
}

const MyWishlist = () => {
    return (
        <div>My Wishlist</div>
    )
}

export default Account