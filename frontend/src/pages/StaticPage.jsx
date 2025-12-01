import { useParams } from 'react-router-dom';

const pageContent = {
    contact: {
        title: 'Contact Us',
        icon: '📞',
        content: (
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <p className="mb-6 text-lg">We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">✉️</span>
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <p className="text-muted">support@shopease.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">📱</span>
                            <div>
                                <h4 className="font-bold">Phone</h4>
                                <p className="text-muted">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">📍</span>
                            <div>
                                <h4 className="font-bold">Address</h4>
                                <p className="text-muted">123 Commerce St, Market City, ST 12345</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="heading-md mb-4">Send us a message</h3>
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        alert('Thank you for your message! We will get back to you shortly.');
                        e.target.reset();
                    }}>
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input type="text" className="input-field w-full" placeholder="Your name" required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input type="email" className="input-field w-full" placeholder="Your email" required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Message</label>
                            <textarea className="input-field w-full h-32" placeholder="How can we help?" required></textarea>
                        </div>
                        <button className="btn btn-primary w-full">Send Message</button>
                    </form>
                </div>
            </div>
        )
    },
    faq: {
        title: 'Frequently Asked Questions',
        icon: '❓',
        content: (
            <div className="space-y-6 max-w-3xl mx-auto">
                {[
                    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout.' },
                    { q: 'What is your return policy?', a: 'You can return items within 30 days of purchase for a full refund, provided they are in original condition.' },
                    { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.' },
                    { q: 'How can I track my order?', a: 'Once your order ships, you will receive an email with a tracking number and link.' }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border">
                        <h3 className="font-bold text-lg mb-2 text-primary">{item.q}</h3>
                        <p className="text-muted">{item.a}</p>
                    </div>
                ))}
            </div>
        )
    },
    shipping: {
        title: 'Shipping Policy',
        icon: '🚚',
        content: (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-border">
                <div className="space-y-6">
                    <div>
                        <h3 className="heading-md mb-2">Free Shipping</h3>
                        <p className="text-muted">We offer free standard shipping on all orders over $50 within the continental US.</p>
                    </div>
                    <hr className="border-border" />
                    <div>
                        <h3 className="heading-md mb-2">Processing Time</h3>
                        <p className="text-muted">Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
                    </div>
                    <hr className="border-border" />
                    <div>
                        <h3 className="heading-md mb-2">International Shipping</h3>
                        <p className="text-muted">We ship internationally via DHL Express. Customs duties and taxes are calculated at checkout and are the responsibility of the customer.</p>
                    </div>
                </div>
            </div>
        )
    }
};

const StaticPage = ({ type }) => {
    const data = pageContent[type] || { title: 'Page Not Found', content: 'The requested page does not exist.' };

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <div className="text-4xl mb-4">{data.icon}</div>
                <h1 className="heading-xl">{data.title}</h1>
            </div>
            <div className="text-lead text-main">
                {data.content}
            </div>
        </div>
    );
};

export default StaticPage;
