import express from "express";

import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import { categoryRouter } from "./api/category";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { orderRouter } from "./api/order";
import { paymentsRouter } from "./api/payment";
import { productRouter } from "./api/product";
import { connectDB } from "./infrastructure/db";

const app = express();
app.use(express.json()); // For parsing JSON requests
app.use(clerkMiddleware());
app.use(cors({ 
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Remove or comment out the logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`, {
//     query: req.query,
//     body: req.body
//   });
//   next();
// });

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentsRouter);

app.use(globalErrorHandlingMiddleware);

connectDB().then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
