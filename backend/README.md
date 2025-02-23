# E-commerce Backend API

A Node.js/Express backend API for an e-commerce platform with authentication, product management, order processing, and payment handling.

## Features

- User authentication using Clerk
- Role-based authorization (Admin/User)
- Product management (CRUD operations)
- Category management
- Order processing
- Address management
- Payment webhook handling
- Input validation using Zod
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Clerk Authentication
- Zod for validation
- Cors for cross-origin requests

## Installation Guide

### 1. System Requirements
- Node.js (v14 or higher)
- MongoDB instance
- Clerk account for authentication

### 2. Project Setup

```bash
# Clone repository
git clone

# Navigate to project
cd backend

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in root directory:
```bash
# Required Environment Variables
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=3000

# Optional Environment Variables
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 4. Database Configuration
- Create MongoDB database (local/Atlas)
- Update MONGODB_URI in `.env`
- Ensure MongoDB is running

### 5. Start Application
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### 6. Verify Installation
- Server running at: `http://localhost:3000`
- Test API endpoint: `http://localhost:3000/api/products`
- MongoDB connected successfully

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (Admin only)
- `PATCH /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (Admin only)
- `PATCH /categories/:id` - Update category (Admin only)
- `DELETE /categories/:id` - Delete category (Admin only)

### Orders
- `POST /orders` - Create order (Authenticated)
- `GET /orders/:id` - Get order by ID (Authenticated)

### Addresses
- `POST /addresses` - Create address (Authenticated)
- `GET /addresses/:id` - Get address by ID (Authenticated)
- `PUT /addresses/:id` - Update address (Authenticated)
- `DELETE /addresses/:id` - Delete address (Authenticated)

### Payments
- `POST /payments/webhook` - Handle payment webhook

## API Documentation

### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product by ID | No |
| POST | `/products` | Create product | Yes (Admin) |
| PATCH | `/products/:id` | Update product | Yes (Admin) |
| DELETE | `/products/:id` | Delete product | Yes (Admin) |

### Categories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| GET | `/categories/:id` | Get category by ID | No |
| POST | `/categories` | Create category | Yes (Admin) |
| PATCH | `/categories/:id` | Update category | Yes (Admin) |
| DELETE | `/categories/:id` | Delete category | Yes (Admin) |

### Orders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create order | Yes |
| GET | `/orders/:id` | Get order by ID | Yes |

### Addresses
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/addresses` | Create address | Yes |
| GET | `/addresses/:id` | Get address | Yes |
| PUT | `/addresses/:id` | Update address | Yes |
| DELETE | `/addresses/:id` | Delete address | Yes |

### Payments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payments/webhook` | Handle payment webhook | No |

## Authentication & Authorization

### Authentication
- Implemented using Clerk
- JWT token-based authentication
- Secure route protection

### Authorization
Role-based access control (RBAC):
- **Admin:** Full access to product and category management
- **User:** Can manage orders and personal addresses

## Error Handling
The API implements comprehensive error handling for:
- 🔍 Validation errors
- 🔒 Authentication errors
- ⛔ Authorization errors
- 📝 Resource not found
- ⚠️ Server errors

## Development
- Uses `nodemon` for development with hot-reloading
- TypeScript compilation on-the-fly using `ts-node`
- ESLint and Prettier for code formatting
- Jest for testing

