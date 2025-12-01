import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    orderItems: cartItems,
                    totalPrice: Number(total),
                    shippingAddress: formData
                }),
            });

            if (response.ok) {
                clearCart();
                navigate('/order-success');
            } else {
                alert('Failed to place order');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error processing checkout');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container">
            <h2 className="heading-xl mb-8">Checkout</h2>
            <div className="flex md:flex-row gap-8 flex-col">
                {/* Shipping Form */}
                <div className="md:w-2/3 w-full">
                    <div className="card p-8">
                        <h3 className="heading-md mb-6">Shipping Details</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-muted mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={user?.name || ''}
                                    disabled
                                    className="input-field opacity-50 cursor-not-allowed"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-muted mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="input-field"
                                    placeholder="123 Luxury Lane"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid-layout grid-2-cols gap-6 mb-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <div>
                                    <label className="block text-muted mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="input-field"
                                        placeholder="New York"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-muted mb-2">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        className="input-field"
                                        placeholder="10001"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-8">
                                <label className="block text-muted mb-2">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    className="input-field"
                                    placeholder="United States"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>

                            <h3 className="heading-md mb-6">Payment</h3>
                            <div className="p-4 border border-[var(--border)] rounded-lg bg-[var(--bg-body)] mb-8">
                                <p className="text-muted text-sm">
                                    <span className="text-accent font-bold">Demo Mode:</span> No payment required.
                                    Click "Place Order" to complete the purchase.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full py-4 text-lg"
                            >
                                {loading ? 'Processing...' : `Place Order ($${total})`}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="md:w-1/3 w-full">
                    <div className="card p-6 sticky top-24">
                        <h3 className="heading-md mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{item.name}</p>
                                        <p className="text-sm text-muted">Qty: {item.qty} × ${item.price}</p>
                                    </div>
                                    <div className="font-medium">
                                        ${(item.qty * item.price).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-[var(--border)] pt-4 space-y-2">
                            <div className="flex justify-between text-muted">
                                <span>Subtotal</span>
                                <span>${total}</span>
                            </div>
                            <div className="flex justify-between text-muted">
                                <span>Shipping</span>
                                <span className="text-accent">Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-[var(--border)]">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
