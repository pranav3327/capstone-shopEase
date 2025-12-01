import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/orders/myorders`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) return <div className="text-center py-20">Loading orders...</div>;

    if (orders.length === 0) {
        return (
            <div className="container text-center py-20">
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-12 max-w-2xl mx-auto">
                    <div className="mb-6 text-6xl">📦</div>
                    <h2 className="heading-lg mb-4">No orders yet</h2>
                    <p className="text-muted mb-8 text-lg">You haven't placed any orders. Start your collection today.</p>
                    <Link to="/products" className="btn btn-primary px-8 py-3">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="heading-xl mb-12 text-center">My Orders</h2>
            <div className="max-w-4xl mx-auto">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-[var(--border)] gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-bold text-xl text-white">Order #{order.id}</span>
                                    <span className={`status-badge ${order.status === 'CANCELLED' ? 'status-cancelled' : order.status === 'COMPLETED' ? 'status-completed' : 'status-pending'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-muted">Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm text-muted block mb-1">Total Amount</span>
                                <span className="font-bold text-2xl text-[var(--accent)]">${order.total}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="cart-item-image w-16 h-16">
                                            {item.product?.image ? (
                                                <img src={item.product.image} alt={item.product.name} />
                                            ) : (
                                                <div className="text-xs text-muted">No Img</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white text-lg">{item.product?.name || `Product #${item.productId}`}</p>
                                            <p className="text-sm text-muted">Qty: {item.quantity} × ${item.price}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
