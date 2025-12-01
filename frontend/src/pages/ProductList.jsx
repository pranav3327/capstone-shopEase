import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import PriceRangeSlider from '../components/PriceRangeSlider';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const sort = searchParams.get('sort');
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');

    const [filterMin, setFilterMin] = useState(minPriceParam || '');
    const [filterMax, setFilterMax] = useState(maxPriceParam || '');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products?limit=100`;
                if (sort) url += `&sort=${sort}`;
                if (keyword) url += `&keyword=${keyword}`;
                if (category) url += `&category=${encodeURIComponent(category)}`;
                if (minPriceParam) url += `&minPrice=${minPriceParam}`;
                if (maxPriceParam) url += `&maxPrice=${maxPriceParam}`;

                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setProducts(data.products);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (err) {
                setError('Error connecting to server');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sort, keyword, category, minPriceParam, maxPriceParam]);

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams);
        if (filterMin) params.set('minPrice', filterMin);
        else params.delete('minPrice');

        if (filterMax) params.set('maxPrice', filterMax);
        else params.delete('maxPrice');

        setSearchParams(params);
    };

    const getTitle = () => {
        if (category) return category.charAt(0).toUpperCase() + category.slice(1);
        if (sort === 'new') return 'New Arrivals';
        if (sort === 'best') return 'Best Sellers';
        if (keyword) return `Search Results for "${keyword}"`;
        return 'All Products';
    };

    if (loading) {
        return (
            <div className="container">
                <div className="bg-primary text-white py-12 px-8 rounded-3xl mb-12 text-center relative overflow-hidden animate-pulse">
                    <div className="h-12 w-1/3 bg-white/10 mx-auto rounded mb-4"></div>
                    <div className="h-6 w-1/2 bg-white/10 mx-auto rounded"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="filter-sidebar h-96 animate-pulse bg-white/5"></div>
                    </div>
                    <div className="flex-grow w-full">
                        <div className="product-grid">
                            {[...Array(8)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (error) return <div className="text-center py-20 text-red">{error}</div>;

    return (
        <div className="container">
            {/* Shop Header */}
            <div className="bg-primary text-white py-12 px-8 rounded-3xl mb-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
                <div className="relative z-10">
                    <h1 className="heading-xl mb-4">{getTitle()}</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Curated excellence. Discover our exclusive collection of premium products.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="filter-sidebar sticky top-24">
                        <h3 className="font-serif text-lg mb-6">Filters</h3>

                        <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-muted">Price Range</h4>
                        <div className="mb-6 px-2">
                            <PriceRangeSlider
                                min={0}
                                max={3000}
                                onChange={({ min, max }) => {
                                    setFilterMin(min);
                                    setFilterMax(max);
                                }}
                            />
                        </div>
                        <button onClick={handleApplyFilters} className="filter-btn mt-4">Apply Price Filter</button>
                    </div>
                </div>


                {/* Product Grid */}
                <div className="flex-grow w-full">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-muted">Showing {products.length} premium items</div>
                        <select
                            className="input-field"
                            style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem' }}
                            onChange={(e) => {
                                const val = e.target.value;
                                const params = new URLSearchParams(searchParams);
                                if (val) params.set('sort', val);
                                else params.delete('sort');
                                setSearchParams(params);
                            }}
                            value={sort || ''}
                        >
                            <option value="">Sort By</option>
                            <option value="new">Newest Arrivals</option>
                            <option value="best">Best Sellers</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-20 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl">
                            <p className="text-lead text-muted">No products found matching your criteria.</p>
                            <button onClick={() => {
                                setSearchParams({});
                                setFilterMin('');
                                setFilterMax('');
                            }} className="btn btn-link mt-4 text-[var(--accent)]">Clear All Filters</button>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
