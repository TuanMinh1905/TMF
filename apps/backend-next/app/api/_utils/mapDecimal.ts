
export function mapProduct(p: any) {
  return { ...p, price: typeof p.price?.toString === 'function' ? parseFloat(p.price.toString()) : p.price };
}
export function mapProducts(list: any[]) { return list.map(mapProduct); }
