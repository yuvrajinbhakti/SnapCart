import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

export default router; 