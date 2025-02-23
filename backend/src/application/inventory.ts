import { Request, Response, NextFunction } from "express";
import Product from "../infrastructure/schemas/Product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

export const updateInventory = async (productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  if (product.stockQuantity < quantity) {
    throw new ValidationError("Insufficient stock");
  }

  product.stockQuantity -= quantity;
  await product.save();

  return product;
};

export const checkInventoryAvailability = async (items: Array<{ productId: string, quantity: number }>) => {
  const results = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new NotFoundError(`Product ${item.productId} not found`);
      }
      
      if (product.stockQuantity < item.quantity) {
        throw new ValidationError(`Insufficient stock for product ${product.name}`);
      }
      
      return {
        product,
        requestedQuantity: item.quantity,
        available: product.stockQuantity >= item.quantity
      };
    })
  );

  return results;
}; 