const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12; // Default to 12 for grid layout
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort;
    const category = req.query.category;

    let orderBy = {};
    if (sort === 'new') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'best') {
      orderBy = { price: 'desc' };
    } else if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    }

    const where = {};
    if (req.query.keyword) {
      where.name = { contains: req.query.keyword };
    }
    if (category) {
      where.category = category;
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      where.price = {};
      if (req.query.minPrice) {
        where.price.gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        where.price.lte = Number(req.query.maxPrice);
      }
    }

    const count = await prisma.product.count({ where });
    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: pageSize,
      skip: pageSize * (page - 1),
    });

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ 
      error: 'Server Error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack 
    });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image,
        category,
        stock,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        price,
        description,
        image,
        category,
        stock,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
