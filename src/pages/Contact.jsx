import React from 'react'
import '../css/Contact.css'
function Contact() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="mt-4">We are here to help you. If you have any questions or need assistance, please feel free to contact us.</p>
          <p className="mt-4">We are available Monday to Friday from 9:00 am to 5:00 pm</p>
          <p className="mt-4">Call us at <span className="fw-bold">+1 123 456 7890</span></p>
          <p className="mt-4">Email us at <span className="fw-bold">
            <a href="mailto:" className="text-decoration-none">
              Email
            </a>
          </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact