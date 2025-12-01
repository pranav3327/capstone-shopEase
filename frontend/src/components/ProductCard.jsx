import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const { showToast } = useToast();
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const checkWishlist = async () => {
            if (user) {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/wishlist`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    const data = await res.json();
                    if (data.some(item => item.id === product.id)) {
                        setIsWishlisted(true);
                    }
                } catch (err) {
                    console.error("Failed to check wishlist", err);
                }
            }
        };
        checkWishlist();
    }, [user, product.id]);

    const handleWishlist = async (e) => {
        e.preventDefault(); // Prevent navigating to product details
        if (!user) {
            showToast('Please login to use wishlist', 'info');
            return;
        }

        try {
            if (isWishlisted) {
                await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/wishlist/${product.id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setIsWishlisted(false);
                showToast('Removed from Wishlist', 'info');
            } else {
                await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/wishlist/${product.id}`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setIsWishlisted(true);
                showToast('Added to Wishlist', 'success');
            }
        } catch (err) {
            showToast('Failed to update wishlist', 'error');
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        showToast(`Added ${product.name} to cart`, 'success');
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                />
                {/* Overlay with View Button */}
                <div className="product-overlay flex flex-col gap-3">
                    <Link
                        to={`/product/${product.id}`}
                        className="view-btn"
                    >
                        View Details
                    </Link>
                    <button
                        className="view-btn bg-[var(--accent)] text-black hover:bg-white"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
                {/* Wishlist Button - Always Visible */}
                <button
                    className={`wishlist-btn ${isWishlisted ? 'text-[var(--accent)]' : ''}`}
                    onClick={handleWishlist}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </div>
            <div className="product-info">
                <div>
                    <h3 className="product-title">
                        <Link to={`/product/${product.id}`}>
                            {product.name}
                        </Link>
                    </h3>
                    <p className="product-category">{product.category}</p>
                </div>
                <p className="product-price">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
