const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin);

  // Clear existing products
  await prisma.orderItem.deleteMany(); // Clear order items first due to FK
  await prisma.product.deleteMany();
  console.log('Cleared existing products');

  // Create Sample Products

  // Create Sample Products
    // Curated Luxury Products
    // Curated Luxury Products with Reliable Images (Hardcoded)
    const hardcodedProducts = [
        // Electronics
        {
            name: "Premium Noise-Cancelling Headphones",
            description: "Immerse yourself in pure sound. These headphones feature adaptive noise cancellation and 30-hour battery life.",
            price: 349.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
            category: "Electronics",
            stock: 50
        },
        {
            name: "Ultra-HD Smart Camera",
            description: "Capture life's moments in stunning 4K. Features AI-powered autofocus and low-light performance.",
            price: 899.99,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
            category: "Electronics",
            stock: 20
        },
        {
            name: "Minimalist Mechanical Keyboard",
            description: "Typing perfection. Wireless, backlit, and built with aerospace-grade aluminum.",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=800&q=80",
            category: "Electronics",
            stock: 30
        },
        {
            name: "Smart Home Hub",
            description: "Control your entire home with voice commands. Sleek design fits any decor.",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80",
            category: "Electronics",
            stock: 45
        },
        {
            name: "Professional Drone",
            description: "Take to the skies. 4K video, obstacle avoidance, and 30-minute flight time.",
            price: 999.99,
            image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
            category: "Electronics",
            stock: 15
        },
        {
            name: "Vintage Turntable",
            description: "Rediscover vinyl. High-fidelity belt-drive turntable with built-in preamp.",
            price: 249.99,
            image: "https://images.unsplash.com/photo-1545459720-aacaf5090834?auto=format&fit=crop&w=800&q=80",
            category: "Electronics",
            stock: 25
        },
        
        // Men's Clothing
        {
            name: "Tailored Wool Overcoat",
            description: "A timeless classic. Made from 100% merino wool for warmth and style.",
            price: 299.00,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            category: "Men's Clothing",
            stock: 25
        },
        {
            name: "Premium Denim Jacket",
            description: "Rugged yet refined. Japanese selvedge denim that gets better with age.",
            price: 149.00,
            image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
            category: "Men's Clothing",
            stock: 40
        },
        {
            name: "Oxford Cotton Shirt",
            description: "The essential white shirt. Crisp, breathable cotton with a perfect fit.",
            price: 89.00,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
            category: "Men's Clothing",
            stock: 60
        },
        {
            name: "Slim Fit Chinos",
            description: "Versatile comfort. Stretch cotton blend for all-day wearability.",
            price: 79.00,
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
            category: "Men's Clothing",
            stock: 50
        },
        {
            name: "Merino Wool Sweater",
            description: "Lightweight warmth. Fine gauge knit perfect for layering.",
            price: 110.00,
            image: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80",
            category: "Men's Clothing",
            stock: 35
        },

        // Women's Clothing
        {
            name: "Silk Evening Gown",
            description: "Elegance personified. A flowing silk gown perfect for black-tie events.",
            price: 599.00,
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
            category: "Women's Clothing",
            stock: 15
        },
        {
            name: "Cashmere Sweater",
            description: "Softness you can feel. 100% cashmere for ultimate comfort and luxury.",
            price: 199.00,
            image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
            category: "Women's Clothing",
            stock: 35
        },
        {
            name: "Floral Summer Dress",
            description: "Breezy and beautiful. Lightweight chiffon with a hand-painted floral print.",
            price: 120.00,
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
            category: "Women's Clothing",
            stock: 45
        },
        {
            name: "High-Waisted Trousers",
            description: "Sophisticated silhouette. Tailored fit with a wide leg.",
            price: 140.00,
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            category: "Women's Clothing",
            stock: 30
        },
        {
            name: "Classic Blazer",
            description: "Power dressing. Structured shoulders and a nipped-in waist.",
            price: 250.00,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            category: "Women's Clothing",
            stock: 20
        },

        // Jewelery
        {
            name: "Diamond Solitaire Necklace",
            description: "A touch of sparkle. 1-carat diamond set in 18k white gold.",
            price: 1299.00,
            image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80",
            category: "Jewelery",
            stock: 10
        },
        {
            name: "Gold Hoop Earrings",
            description: "Classic and bold. Solid 14k gold hoops for everyday luxury.",
            price: 350.00,
            image: "https://images.unsplash.com/photo-1635767798638-3e2523464695?auto=format&fit=crop&w=800&q=80",
            category: "Jewelery",
            stock: 20
        },
        {
            name: "Pearl Bracelet",
            description: "Timeless elegance. Freshwater pearls strung on silk thread.",
            price: 180.00,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
            category: "Jewelery",
            stock: 25
        },
        {
            name: "Sapphire Ring",
            description: "Royal blue. A deep blue sapphire surrounded by a halo of diamonds.",
            price: 850.00,
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
            category: "Jewelery",
            stock: 8
        },

        // Men's Watches
        {
            name: "Luxury Chronograph Watch",
            description: "Precision engineering. Swiss movement with a sapphire crystal face.",
            price: 2450.00,
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
            category: "Men's Watches",
            stock: 5
        },
        {
            name: "Classic Leather Watch",
            description: "Timeless design. Genuine leather strap with a minimalist dial.",
            price: 199.00,
            image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
            category: "Men's Watches",
            stock: 30
        },
        {
            name: "Diver's Watch",
            description: "Built for adventure. Water resistant to 300m with a rotating bezel.",
            price: 450.00,
            image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80",
            category: "Men's Watches",
            stock: 15
        },

        // Women's Bags
        {
            name: "Designer Leather Tote",
            description: "Carry it all in style. Italian leather with gold-plated hardware.",
            price: 450.00,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            category: "Women's Bags",
            stock: 15
        },
        {
            name: "Chic Crossbody Bag",
            description: "Perfect for the city. Compact, stylish, and versatile.",
            price: 180.00,
            image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
            category: "Women's Bags",
            stock: 40
        },
        {
            name: "Clutch Purse",
            description: "Evening essential. Satin finish with a detachable chain strap.",
            price: 95.00,
            image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
            category: "Women's Bags",
            stock: 35
        },

        // Fragrances
        {
            name: "Signature Eau de Parfum",
            description: "A scent that lingers. Notes of jasmine, oud, and vanilla.",
            price: 120.00,
            image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&w=800&q=80",
            category: "Fragrances",
            stock: 60
        },
        {
            name: "Citrus Fresh Cologne",
            description: "Energizing and crisp. Lemon, bergamot, and sea salt.",
            price: 95.00,
            image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
            category: "Fragrances",
            stock: 50
        },
        {
            name: "Woody Spice Fragrance",
            description: "Warm and inviting. Sandalwood, cedar, and black pepper.",
            price: 110.00,
            image: "https://images.unsplash.com/photo-1523293188086-b46e0a804130?auto=format&fit=crop&w=800&q=80",
            category: "Fragrances",
            stock: 40
        },

        // Beauty
        {
            name: "Hydrating Face Serum",
            description: "Radiance in a bottle. Vitamin C and Hyaluronic Acid blend.",
            price: 65.00,
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
            category: "Beauty",
            stock: 80
        },
        {
            name: "Velvet Matte Lipstick",
            description: "Rich color payoff. Long-lasting formula that doesn't dry out.",
            price: 35.00,
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
            category: "Beauty",
            stock: 100
        },
        {
            name: "Luxury Eye Palette",
            description: "Create endless looks. 12 highly pigmented shades in matte and shimmer.",
            price: 55.00,
            image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
            category: "Beauty",
            stock: 60
        },

        // Home & Living
        {
            name: "Modern Velvet Armchair",
            description: "Statement piece. Plush velvet upholstery on a solid wood frame.",
            price: 399.00,
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
            category: "Home & Living",
            stock: 10
        },
        {
            name: "Ceramic Vase Collection",
            description: "Artisan crafted. Set of 3 hand-thrown ceramic vases.",
            price: 85.00,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80",
            category: "Home & Living",
            stock: 25
        },
        {
            name: "Linen Bedding Set",
            description: "Sleep in luxury. 100% French flax linen, pre-washed for softness.",
            price: 220.00,
            image: "https://images.unsplash.com/photo-1522771753035-0a153950c6b2?auto=format&fit=crop&w=800&q=80",
            category: "Home & Living",
            stock: 15
        },
        {
            name: "Scented Soy Candle",
            description: "Relax and unwind. Hand-poured soy wax with essential oils.",
            price: 35.00,
            image: "https://images.unsplash.com/photo-1602825485432-69925c6ea779?auto=format&fit=crop&w=800&q=80",
            category: "Home & Living",
            stock: 100
        },

        // Footwear
        {
            name: "Leather Chelsea Boots",
            description: "Everyday essential. Durable leather with a comfortable sole.",
            price: 160.00,
            image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80",
            category: "Footwear",
            stock: 30
        },
        {
            name: "White Minimalist Sneakers",
            description: "Clean and crisp. Premium leather sneakers for any outfit.",
            price: 120.00,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
            category: "Footwear",
            stock: 45
        },
        {
            name: "Suede Loafers",
            description: "Casual elegance. Soft suede with a classic penny loafer design.",
            price: 140.00,
            image: "https://images.unsplash.com/photo-1533867617858-e7b97e0605df?auto=format&fit=crop&w=800&q=80",
            category: "Footwear",
            stock: 35
        },

        // Sports
        {
            name: "Pro Yoga Mat",
            description: "Find your zen. Non-slip, extra thick, and eco-friendly.",
            price: 55.00,
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
            category: "Sports",
            stock: 60
        },
        {
            name: "Cast Iron Kettlebell",
            description: "Build strength. Solid cast iron with a powder coat finish.",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
            category: "Sports",
            stock: 40
        },
        {
            name: "Performance Running Shoes",
            description: "Run further. Responsive cushioning and breathable mesh.",
            price: 130.00,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            category: "Sports",
            stock: 50
        },

        // Gourmet
        {
            name: "Artisan Coffee Beans",
            description: "Single-origin excellence. Roasted to perfection.",
            price: 25.00,
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
            category: "Gourmet",
            stock: 100
        },
        {
            name: "Truffle Oil Selection",
            description: "Culinary luxury. Infused with real truffle slices.",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?auto=format&fit=crop&w=800&q=80",
            category: "Gourmet",
            stock: 40
        },
        {
            name: "Premium Dark Chocolate",
            description: "Indulge your senses. 70% cocoa with hints of sea salt.",
            price: 15.00,
            image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
            category: "Gourmet",
            stock: 80
        }
    ];

    // Helper to fetch JSON using https
    const fetchJson = (url) => {
        return new Promise((resolve, reject) => {
            const https = require('https');
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on('error', (err) => reject(err));
        });
    };

    let products = [...hardcodedProducts];

    // Fetch additional items from DummyJSON
    try {
        console.log('Fetching data from DummyJSON...');
        const data = await fetchJson('https://dummyjson.com/products?limit=194'); // Fetch all
        
        if (data.products) {
            const categoryMap = {
                'smartphones': 'Electronics',
                'laptops': 'Electronics',
                'tablets': 'Electronics',
                'mobile-accessories': 'Electronics',
                'mens-shirts': "Men's Clothing",
                'mens-shoes': 'Footwear',
                'mens-watches': "Men's Watches",
                'womens-watches': 'Accessories',
                'womens-bags': "Women's Bags",
                'womens-jewellery': 'Jewelery',
                'sunglasses': 'Accessories',
                'lighting': 'Home & Living',
                'furniture': 'Home & Living',
                'home-decoration': 'Home & Living',
                'tops': "Women's Clothing",
                'womens-dresses': "Women's Clothing",
                'womens-shoes': 'Footwear',
                'groceries': 'Gourmet',
                'skincare': 'Beauty',
                'fragrances': 'Fragrances',
                'sports-accessories': 'Sports'
            };

            for (const p of data.products) {
                const shopEaseCategory = categoryMap[p.category];
                
                // Only add if we have a mapping and a valid thumbnail
                if (shopEaseCategory && p.thumbnail && p.thumbnail.startsWith('http')) {
                    products.push({
                        name: p.title,
                        description: p.description,
                        price: p.price,
                        image: p.thumbnail,
                        category: shopEaseCategory,
                        stock: p.stock || 20
                    });
                }
            }
        }
    } catch (err) {
        console.error('Failed to fetch from DummyJSON:', err.message);
    }

    // Helper delay function
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    console.log(`Seeding ${products.length} products...`);

    for (const product of products) {
        await prisma.product.create({
            data: product
        });
    }

    console.log('Database seeded with luxury products!');
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = main;
