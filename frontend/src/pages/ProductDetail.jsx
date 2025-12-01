import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProduct(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="container">
            <div className="flex md:flex-row gap-12 mt-8">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <div className="card p-8 flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden relative group" style={{ aspectRatio: '3/4' }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="mb-2">
                        <span className="text-accent text-sm tracking-widest uppercase font-bold">{product.category}</span>
                    </div>
                    <h2 className="heading-xl mb-6 leading-tight">{product.name}</h2>
                    <p className="text-lead mb-8 text-gray-400 leading-relaxed">{product.description}</p>

                    <div className="flex items-center gap-6 mb-8">
                        <p className="text-4xl font-bold text-white">${product.price}</p>
                        {product.stock > 0 && (
                            <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-900/50">
                                In Stock
                            </span>
                        )}
                    </div>

                    <div className="p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] mb-8">
                        <div className="flex items-center gap-6 mb-6">
                            <label className="font-medium text-gray-300">Quantity</label>
                            <div className="flex items-center bg-[var(--bg-body)] rounded-lg border border-[var(--border)]">
                                <button
                                    className="px-4 py-2 text-xl hover:text-accent transition-colors"
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                >-</button>
                                <span className="w-12 text-center font-medium">{qty}</span>
                                <button
                                    className="px-4 py-2 text-xl hover:text-accent transition-colors"
                                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                >+</button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="btn btn-primary w-full py-4 text-lg font-bold tracking-wide"
                            disabled={product.stock === 0}
                        >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>

                    <div className="flex gap-8 text-sm text-muted">
                        <div className="flex items-center gap-2">
                            <span>🚚</span> Free Shipping
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🛡️</span> 2 Year Warranty
                        </div>
                        <div className="flex items-center gap-2">
                            <span>↩️</span> 30 Day Returns
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
