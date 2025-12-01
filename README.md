# 🚗 GloCar - Professional Car Service Platform

A modern, full-stack car service and maintenance booking platform built with Next.js and Express. Customers can browse services, book appointments, make payments, and track their bookings. Administrators can manage services, locations, and orders through a comprehensive admin panel.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-4.18-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Features

### Customer Features
- 🔍 **Browse Services** - View all available car services with detailed descriptions
- 📍 **Location Selection** - Auto-detect or manually select service location
- 📅 **Easy Booking** - Simple multi-step booking process
- 💳 **Multiple Payment Options** - Razorpay integration + Cash on Delivery
- 📧 **Email Notifications** - Automatic booking confirmations
- 📱 **WhatsApp Integration** - Quick customer support
- 🎨 **Responsive Design** - Works perfectly on all devices
- ✨ **Smooth Animations** - Beautiful UI with Framer Motion

### Admin Features
- 🎛️ **Dashboard** - Overview of bookings, revenue, and statistics
- 📊 **Order Management** - View, filter, and update booking status
- 📅 **Date Range Filtering** - Filter orders by custom date ranges
- 📥 **CSV Export** - Export filtered orders to CSV
- 🛠️ **Service Management** - Add, edit, and manage services
- 📍 **Location Management** - Manage service locations
- 🔐 **Secure Authentication** - JWT-based admin authentication
- 📱 **Mobile-Friendly** - Hamburger menu with slide animations

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **HTTP Client**: Axios

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Razorpay
- **Email**: Nodemailer
- **Security**: bcryptjs, CORS

## 📁 Project Structure

```
glocar-website/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── admin/          # Admin panel pages
│   │   ├── booking/        # Booking flow pages
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   └── services/       # Services page
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── admin/     # Admin components
│   │   │   ├── forms/     # Form components
│   │   │   ├── layout/    # Layout components
│   │   │   ├── sections/  # Page sections
│   │   │   └── ui/        # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
├── backend/                 # Express backend API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   └── .env.example       # Environment variables template
│
└── docs/                   # Documentation files
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/glocar-website.git
cd glocar-website
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure environment variables**

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car-service
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
BUSINESS_EMAIL=your-business-email@example.com
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Run the application**

**Option A: Run both servers separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Option B: Use the start script (Windows)**
```bash
# Double-click start-dev.bat
# Or run:
start-dev.bat
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Admin Panel: http://localhost:3000/admin/login

## 🔑 Default Admin Credentials

```
Email: admin@glocar.com
Password: admin123
```

**⚠️ Change these credentials in production!**

## 📚 API Documentation

### Public Endpoints
- `GET /api/services` - Get all services
- `GET /api/locations` - Get all locations
- `POST /api/bookings` - Create a booking
- `POST /api/contact/send` - Send contact message

### Admin Endpoints (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/bookings` - Get all bookings
- `PUT /api/bookings/:id/status` - Update booking status
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

## 💳 Payment Integration

### Razorpay Setup
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API keys from Dashboard
3. Add keys to `.env` files
4. Test with test mode keys first

### Supported Payment Methods
- Credit/Debit Cards
- UPI
- Net Banking
- Wallets
- Cash on Delivery (COD)

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add credentials to `backend/.env`

See `DOCUMENTATION.md` for detailed email setup instructions.

## 🎨 Features Showcase

### Customer Journey
1. **Browse Services** → View available services with prices
2. **Select Location** → Auto-detect or choose manually
3. **Book Service** → Fill booking form with car details
4. **Choose Payment** → Pay online or select COD
5. **Confirmation** → Receive email confirmation

### Admin Workflow
1. **Login** → Secure admin authentication
2. **Dashboard** → View statistics and recent bookings
3. **Manage Orders** → Filter by date, status, export to CSV
4. **Manage Services** → Add/edit/delete services
5. **Manage Locations** → Add/edit service locations

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Environment variable protection
- Input validation
- Secure payment processing

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/YOUR-USERNAME)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Razorpay for payment integration
- MongoDB for the database
- All open-source contributors

## 📞 Support

For support, email support@glocar.com or join our WhatsApp community.

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [Documentation](./DOCUMENTATION.md)
- [API Docs](./API-DOCS.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

**Made with ❤️ for car service businesses**

⭐ Star this repo if you find it helpful!
