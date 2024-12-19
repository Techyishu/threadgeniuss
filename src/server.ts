import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'https';
import fs from 'fs';
import path from 'path';

const app = express();

// ...existing code...

// Use Helmet to set secure headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});

// Create HTTPS server
const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'ssl/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.pem')),
};
createServer(httpsOptions, app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

// ...existing code...
