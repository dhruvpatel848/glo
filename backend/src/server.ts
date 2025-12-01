import dotenv from 'dotenv';
import path from 'path';

// Load environment variables FIRST before any other imports
const envPath = path.resolve(process.cwd(), '.env');
console.log('Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('Error loading .env:', result.error);
} else {
  console.log('.env loaded successfully');
}

// Now import everything else AFTER env vars are loaded
import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/database';

// Import routes
import servicesRoutes from './routes/services';
import locationsRoutes from './routes/locations';
import bookingsRoutes from './routes/bookings';
import paymentsRoutes from './routes/payments';
import adminRoutes from './routes/admin';
import contactRoutes from './routes/contact';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Car Service API is running' });
});

app.use('/api/services', servicesRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

export default app;
