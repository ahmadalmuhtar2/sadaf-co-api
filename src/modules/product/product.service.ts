import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProductInput } from './dto/create-product.dto';
import { ListProductsInput } from './dto/list-products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductInput) {
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        name: data.name,
        currency: data.currency ?? 'USD',
      },
    });
    if (existingProduct) {
      throw new ConflictException(
        `A product named ${data.name} already exists in ${existingProduct.currency}.`,
      );
    }
    return this.prisma.product.create({ data });
  }

  findAll(opts: ListProductsInput) {
    return this.prisma.product.findMany({
      where: {
        currency: opts.currency,
        inStock: opts.inStock,
        priceCents: { gte: opts.minPrice, lte: opts.maxPrice },
        name: opts.search
          ? { contains: opts.search, mode: 'insensitive' }
          : undefined,
      },
      skip: (opts.page - 1) * opts.limit,
      take: opts.limit,
      orderBy: { createdAt: opts.sort },
    });
  }
}
