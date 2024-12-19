import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// ...existing code...

router.get('/profile', authenticate, (req, res) => {
  res.json({ profile: req.user });
});

router.post('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// ...existing code...

export default router;
