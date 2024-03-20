import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className="container" style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className="display-1 fw-bold">
                404 Not Found
            </div>
            <div className="fw-semibold">
                You visited page not found. You may go home page.
            </div>
            <div className="mt-5"></div>
            <Link to="/" className="btn btn-danger mt-3 fw-bold" style={{ padding: '15px 50px',borderRadius: '10px' }}>
                Back to Home Page
            </Link>
        </div>
    )
}

export default Error