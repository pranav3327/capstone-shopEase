import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems, clearCart } = useCart();
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products?keyword=${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-brand" style={{ color: 'white', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Shop<span style={{ color: 'var(--accent)' }}>Ease</span>
                </Link>

                <form onSubmit={submitHandler} className="hidden md:block search-container">
                    <input
                        type="text"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search for luxury..."
                        className="search-input"
                    />
                </form>

                <div className="nav-links">
                    <Link to="/products" className="nav-link">Products</Link>
                    <Link to="/cart" className="nav-link" style={{ position: 'relative' }}>
                        Cart
                        {cartItems.length > 0 && (
                            <span className="badge">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin" className="nav-link">Admin</Link>
                            )}
                            <Link to="/orders" className="nav-link">My Orders</Link>
                            <Link to="/wishlist" className="nav-link">Wishlist</Link>
                            <Link to="/profile" className="nav-link">My Profile</Link>
                            <button onClick={() => {
                                logout();
                                clearCart();
                                navigate('/');
                            }} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
