import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products?sort=best&limit=60`);
        const data = await response.json();
        if (response.ok) {
          // Diversity Logic: Round-robin selection from categories
          const allProducts = data.products;
          const diverse = [];
          const categories = [...new Set(allProducts.map(p => p.category))];

          // Create a map of category -> products
          const productsByCategory = {};
          categories.forEach(cat => {
            productsByCategory[cat] = allProducts.filter(p => p.category === cat);
          });

          // Round robin pick
          let hasMore = true;
          while (diverse.length < 8 && hasMore) {
            hasMore = false;
            for (const cat of categories) {
              if (diverse.length >= 8) break;
              if (productsByCategory[cat].length > 0) {
                diverse.push(productsByCategory[cat].shift());
                hasMore = true;
              }
            }
          }

          setFeaturedProducts(diverse);
        }
      } catch (error) {
        console.error('Failed to fetch featured products');
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        marginBottom: '6rem'
      }}>
        {/* Background Image with Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2
        }}></div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(11,13,15,0.4), rgba(11,13,15,1))',
          zIndex: -1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="heading-xl mb-6" style={{ textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
            Elevate Your <span style={{ color: 'var(--accent)' }}>Lifestyle</span>
          </h1>
          <p className="text-lead mb-10" style={{ maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.25rem', color: '#e2e8f0' }}>
            Discover a curated collection of premium products. From exclusive fashion to cutting-edge electronics, find quality that speaks to you.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mb-20">
        <h2 className="heading-lg text-center mb-12">Browse Categories</h2>
        <div className="grid-layout grid-3-cols">
          {[
            { title: "Electronics", category: "Electronics", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Jewelry", category: "Jewelery", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Men's Fashion", category: "Men's Clothing", img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Women's Fashion", category: "Women's Clothing", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Beauty", category: "Beauty", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Accessories", category: "Accessories", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Home & Living", category: "Home & Living", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Footwear", category: "Footwear", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
            { title: "Sports", category: "Sports", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
          ].map((item, index) => (
            <Link key={index} to={`/products?category=${encodeURIComponent(item.category)}`} className="collection-card" style={{
              position: 'relative',
              height: '300px',
              borderRadius: '18px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: `url(${item.img}) center/cover`,
              display: 'block'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem',
                transition: 'all 0.3s ease'
              }} className="hover:backdrop-blur-sm">
                <div>
                  <h3 className="heading-md mb-2">{item.title}</h3>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>View Collection &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="heading-lg mb-2">Premium Collection</h2>
            <p className="text-muted">Curated excellence for the discerning taste</p>
          </div>
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </div>
        <div className="grid-layout grid-4-cols">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading masterpieces...</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
