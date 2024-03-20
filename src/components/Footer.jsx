import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Footer.css'
function Footer() {
    return (
        <div class="footer-dark">
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <Link to="/latest-news"><li>Latest News</li></Link>
                                <Link to="/sports"><li>Sports</li></Link>
                                <Link to="/entertainment"><li>Entertainment</li></Link>
                                <Link to="/technology"><li>Technology</li></Link>
                            </ul>
                        </div>
                        <div class="col-sm-6 col-md-3 item">
                            <h3>Categories</h3>
                            <ul>
                                <Link to="/politics"><li>Politics</li></Link>
                                <Link to="/business"><li>Business</li></Link>
                                <Link to="/search"><li>Search</li></Link>
                            </ul>
                        </div>
                        <div class="col-md-6 item text">
                            <h3>InSightHub</h3>
                            <p>Get the latest news from around the world. Stay updated with the latest news from different categories like sports, entertainment, technology, politics, business and many more.</p>
                        </div>
                        <div class="col item social">
                            <Link to="/"><i class="fa fa-facebook"></i></Link>
                            <Link to="/"><i class="fa fa-twitter"></i></Link>
                            <Link to="/"><i class="fa fa-youtube"></i></Link>
                            <Link to="/"><i class="fa fa-instagram"></i></Link>
                        </div>
                    </div>
                    <p class="copyright">InSightHub &copy; 2024</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
