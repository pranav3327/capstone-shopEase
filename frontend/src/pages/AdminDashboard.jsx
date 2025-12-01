import { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('products');

    useEffect(() => {
        // Fetch products and orders (mock or real)
        const fetchData = async () => {
            // Implement fetching logic
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h2 className="heading-xl mb-8">Admin Dashboard</h2>
            <div className="flex gap-4 mb-8 border-b border-border pb-4">
                <button
                    className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                <button
                    className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
            </div>

            {activeTab === 'products' ? (
                <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="heading-md">Product Management</h3>
                        <button className="btn btn-success" style={{ backgroundColor: 'var(--success)', color: 'white' }}>Add Product</button>
                    </div>
                    {/* Product List Table */}
                    <div className="text-center py-10 text-muted bg-bg-body rounded-md border border-border">
                        Product management interface coming soon...
                    </div>
                </div>
            ) : (
                <div className="card p-6">
                    <h3 className="heading-md mb-6">Order Management</h3>
                    {/* Order List Table */}
                    <div className="text-center py-10 text-muted bg-bg-body rounded-md border border-border">
                        Order management interface coming soon...
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
