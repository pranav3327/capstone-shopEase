const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { wishlist: true },
    });
    res.json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/:id
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        wishlist: {
          connect: { id: productId },
        },
      },
    });
    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        wishlist: {
          disconnect: { id: productId },
        },
      },
    });
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
