import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="container">
            <div className="text-center py-20">
                <div style={{ fontSize: '4rem', color: 'var(--success)', marginBottom: '1rem' }}>🎉</div>
                <h1 className="heading-xl mb-4">Order Placed Successfully!</h1>
                <p className="text-lead mb-8">Thank you for your purchase. Your order has been received.</p>
                <div className="flex justify-center gap-4">
                    <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
                    <Link to="/orders" className="btn btn-outline">View Orders</Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
