import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ProductSchema } from '../../../generated/zod';

const P = ProductSchema.shape;

export const ListProductsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().trim().min(1).optional(),
  currency: P.currency.optional(),
  minPrice: z.coerce.number().int().nonnegative().optional(),
  maxPrice: z.coerce.number().int().nonnegative().optional(),
  inStock: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .optional(),
});

export class ListProductsDto extends createZodDto(ListProductsSchema) {}
export type ListProductsInput = z.infer<typeof ListProductsSchema>;
