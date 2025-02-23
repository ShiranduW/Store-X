import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ValidationError from "../domain/errors/validation-error";
import Order from "../infrastructure/schemas/Order";
import { getAuth } from "@clerk/express";
import NotFoundError from "../domain/errors/not-found-error";
import Address from "../infrastructure/schemas/Address";
import { CreateOrderDTO } from "../domain/dto/order";
import { checkInventoryAvailability, updateInventory } from "./inventory";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = CreateOrderDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError("Invalid order data");
    }

    // Check inventory availability for all items
    const inventoryCheck = await checkInventoryAvailability(
      result.data.items.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }))
    );

    // If we got here, inventory is available. Create order
    const order = await Order.create({
      ...result.data,
      userId: req.auth.userId,
      status: "PENDING",
      paymentStatus: "PENDING"
    });

    // Update inventory for all items
    await Promise.all(
      result.data.items.map(item =>
        updateInventory(item.product._id, item.quantity)
      )
    );

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id).populate({
      path: "addressId",
      model: "Address",
    }).populate({
      path:"items."
    });
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
