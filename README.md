# Store-X Store Frontend

A modern e-commerce web application built with React and Vite, featuring user authentication and shopping cart functionality.

## Overview

This project is a frontend implementation of an e-commerce store that demonstrates modern web development practices and React ecosystem integration.

## Technologies

- React 18.3
- Vite
- Redux Toolkit
- Clerk Authentication
- Tailwind CSS & Shadcn UI
- React Router
- React Hook Form + Zod

## Core Features

- **Authentication & Authorization**
  - Secure login/signup
  - Protected routes
  - User profile management

- **E-commerce Features**
  - Product catalog
  - Shopping cart with Redux state
  - Checkout process

- **UI/UX**
  - Responsive design
  - Modern component library
  - Form validation

## Setup

1. Clone and install:
```bash
git clone [repository-url]
cd frontend
npm install
```

2. Environment setup:
```bash
# Create .env file with:
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

3. Run development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Development mode
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run linter

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── assets/         # Images and assets
│   ├── components/     # React components
│   │   └── ui/        # Shadcn UI components
│   ├── lib/           # Utility functions
│   ├── pages/        # Page components
│   └── main.jsx       # Entry point
├── index.html          # HTML entry
├── package.json        # Dependencies and scripts
└── config files      # Configuration files
```

## Documentation

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Clerk](https://clerk.dev/docs)
