import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            Shop<span className="text-accent">Ease</span>
                        </Link>
                        <p className="footer-desc">
                            Curating the finest luxury timepieces and accessories for the discerning individual. Excellence in every detail.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon">IG</a>
                            <a href="#" className="social-icon">TW</a>
                            <a href="#" className="social-icon">FB</a>
                        </div>
                    </div>

                    {/* Collection Links */}
                    <div>
                        <h4 className="footer-heading">Collections</h4>
                        <ul className="footer-links">
                            <li><Link to="/products" className="footer-link">All Products</Link></li>
                            <li><Link to="/products?category=Men's Watches" className="footer-link">Men's Watches</Link></li>
                            <li><Link to="/products?category=Women's Bags" className="footer-link">Luxury Bags</Link></li>
                            <li><Link to="/products?category=Fragrances" className="footer-link">Fragrances</Link></li>
                        </ul>
                    </div>

                    {/* Concierge/Support */}
                    <div>
                        <h4 className="footer-heading">Concierge</h4>
                        <ul className="footer-links">
                            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                            <li><Link to="/shipping" className="footer-link">Shipping & Returns</Link></li>
                            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                            <li><span className="footer-link" style={{ cursor: 'pointer' }}>Track Order</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
                    <div className="footer-legal">
                        <span className="legal-link">Privacy Policy</span>
                        <span className="legal-link">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
