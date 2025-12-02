
export function mapProduct(p: any) {
  return {
    id: p.id,
    name: p.name,
    title: p.title,
    alias: p.alias,
    sku: p.sku,
    price: typeof p.price?.toString === 'function' ? parseFloat(p.price.toString()) : p.price,
    compareAtPrice: typeof p.compareAtPrice?.toString === 'function' ? parseFloat(p.compareAtPrice.toString()) : p.compareAtPrice,
    description: p.description,
    imageUrl: p.imageUrl,
    rating: typeof p.rating?.toString === 'function' ? parseFloat(p.rating.toString()) : p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    isActive: p.isActive,
    categoryId: p.categoryId,
    brandId: p.brandId,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    category: p.category,
    brand: p.brand,
  };
}
export function mapProducts(list: any[]) { return list.map(mapProduct); }
