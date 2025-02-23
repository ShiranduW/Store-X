import { z } from "zod";

export const CreateProductDTO = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId: z.string(),
  image: z.string(),
  stockQuantity: z.number().min(0).default(0)
});

export const UpdateProductDTO = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  image: z.string().optional(),
  categoryId: z.string().optional(),
  stockQuantity: z.number().min(0).optional()
});

export const GetProductsQueryDTO = z.object({
  categoryId: z.string().optional(),
  sortBy: z.enum(['asc', 'desc', '']).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
}).passthrough();

export type GetProductsQuery = z.infer<typeof GetProductsQueryDTO>;
