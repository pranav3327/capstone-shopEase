const express = require('express');
const router = express.Router();
const seed = require('../prisma/seed');

router.post('/', async (req, res) => {
  try {
    console.log('Starting remote seed...');
    await seed();
    res.status(200).json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seeding failed:', error);
    res.status(500).json({ error: 'Seeding failed', details: error.message });
  }
});

module.exports = router;
