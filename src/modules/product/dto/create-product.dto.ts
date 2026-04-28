import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ProductSchema } from '../../../generated/zod';

const P = ProductSchema.shape;

export const CreateProductSchema = z.object({
  name: P.name.min(1, 'Name cannot be empty.'),
  description: P.description.optional(),
  priceCents: z
    .number({ message: 'Price is required.' })
    .int('Price must be a whole number of cents.')
    .positive('Price must be greater than zero.'),
  currency: P.currency.optional(),
  inStock: P.inStock.optional(),
});

export class CreateProductDto extends createZodDto(CreateProductSchema) {}
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
