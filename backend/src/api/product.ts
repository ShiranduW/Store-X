import express from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../application/product";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";
import { validateQuery } from "./middleware/validation-middleware";
import { GetProductsQueryDTO } from "../domain/dto/product";
import { Request, Response, NextFunction } from "express";

export const productRouter = express.Router();

// Add logging middleware
const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[Product API] ${req.method} ${req.path}`, {
    query: req.query,
    params: req.params
  });
  next();
};

// Add error handling middleware
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

productRouter
  .route("/")
  .get(
    logRequest,
    validateQuery(GetProductsQueryDTO),
    asyncHandler(getProducts)
  )
  .post(isAuthenticated, isAdmin, createProduct); //Remove isAuthenticated and isAdmin for using with Postman
productRouter
  .route("/:id")
  .get(getProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct)
  .patch(isAuthenticated, isAdmin, updateProduct);

productRouter.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Products API is working' });
});
