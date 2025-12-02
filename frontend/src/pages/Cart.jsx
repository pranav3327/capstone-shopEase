import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const handleCheckout = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container text-center py-20">
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-12 max-w-2xl mx-auto">
                    <div className="mb-6 text-6xl">🛒</div>
                    <h2 className="heading-lg mb-4">Your cart is empty</h2>
                    <p className="text-muted mb-8 text-lg">Looks like you haven't added anything to your cart yet!</p>
                    <Link to="/products" className="btn btn-primary px-8 py-3">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="heading-xl mb-12 text-center">Shopping Cart</h2>

            <div className="cart-layout">
                <div className="cart-items-container">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="flex items-center gap-6">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div>
                                    <Link to={`/product/${item.id}`} className="font-bold text-lg hover:text-[var(--accent)] transition-colors block mb-1">
                                        {item.name}
                                    </Link>
                                    <p className="text-muted">${item.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-sm text-muted">
                                    Qty: <span className="text-white font-medium">{item.qty}</span>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/10"
                                    title="Remove item"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-8 flex justify-between items-center">
                        <Link to="/products" className="text-muted hover:text-white flex items-center gap-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Continue Shopping
                        </Link>
                        <button onClick={clearCart} className="text-muted hover:text-red-500 text-sm transition-colors">
                            Clear Cart
                        </button>
                    </div>
                </div>

                <div className="cart-summary">
                    <h3 className="heading-md mb-6 pb-4 border-b border-[var(--border)]">Order Summary</h3>

                    <div className="flex justify-between mb-4 text-lg">
                        <span className="text-muted">Subtotal</span>
                        <span className="font-bold">${total}</span>
                    </div>

                    <div className="flex justify-between mb-8 text-sm text-muted">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleCheckout}
                            className="btn btn-primary w-full py-4 text-lg"
                        >
                            Proceed to Checkout
                        </button>

                        <div className="flex justify-center gap-4 mt-6 opacity-50">
                            <span className="text-xs">💳 Secure Checkout</span>
                            <span className="text-xs">🔒 Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
