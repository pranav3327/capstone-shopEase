import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Please login to view wishlist');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/wishlist`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setWishlist(data);
                } else {
                    setError('Failed to fetch wishlist');
                }
            } catch (err) {
                setError('Error connecting to server');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="container">
            <div className="bg-primary text-white py-12 px-8 rounded-3xl mb-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
                <div className="relative z-10">
                    <h1 className="heading-xl mb-4">My Wishlist</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Your curated collection of favorites.
                    </p>
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl">
                    <p className="text-lead text-muted">Your wishlist is empty.</p>
                    <Link to="/products" className="btn btn-primary mt-6">Start Shopping</Link>
                </div>
            ) : (
                <div className="product-grid">
                    {wishlist.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
