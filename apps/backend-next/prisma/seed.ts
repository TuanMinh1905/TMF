
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Xóa dữ liệu cũ
  await prisma.image.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});

  // Thêm danh mục
  const categories = ['Áo', 'Quần', 'Giày', 'Phụ kiện'];
  const categoryRecords = [];
  for (const name of categories) {
    const cat = await prisma.category.create({ data: { name } });
    categoryRecords.push(cat);
  }

  // Thêm thương hiệu
  const brands = ['Nike', 'Adidas', 'H&M', 'Zara', 'Calvin Klein'];
  const brandRecords = [];
  for (const name of brands) {
    const brand = await prisma.brand.create({ data: { name } });
    brandRecords.push(brand);
  }

  // Thêm sản phẩm mẫu
  const products = [
    { name: 'Áo Thun Nam Cơ Bản', sku: 'SHIRT-001', price: 199999, categoryId: categoryRecords[0].id, brandId: brandRecords[0].id },
    { name: 'Áo Sơ Mi Trắng Công Sở', sku: 'SHIRT-002', price: 349999, categoryId: categoryRecords[0].id, brandId: brandRecords[1].id },
    { name: 'Áo Khoác Jean Nam', sku: 'SHIRT-003', price: 499999, categoryId: categoryRecords[0].id, brandId: brandRecords[2].id },
    { name: 'Quần Jeans Xanh Nam', sku: 'PANTS-001', price: 399999, categoryId: categoryRecords[1].id, brandId: brandRecords[0].id },
    { name: 'Quần Tây Nam Đen', sku: 'PANTS-002', price: 599999, categoryId: categoryRecords[1].id, brandId: brandRecords[3].id },
    { name: 'Quần Short Nam Mùa Hè', sku: 'PANTS-003', price: 249999, categoryId: categoryRecords[1].id, brandId: brandRecords[4].id },
    { name: 'Giày Sneaker Nam Trắng', sku: 'SHOES-001', price: 899999, categoryId: categoryRecords[2].id, brandId: brandRecords[0].id },
    { name: 'Giày Chạy Bộ Nam', sku: 'SHOES-002', price: 1299999, categoryId: categoryRecords[2].id, brandId: brandRecords[1].id },
    { name: 'Giày Lười Nam', sku: 'SHOES-003', price: 599999, categoryId: categoryRecords[2].id, brandId: brandRecords[2].id },
    { name: 'Thắt Lưng Nam Da', sku: 'ACC-001', price: 199999, categoryId: categoryRecords[3].id, brandId: brandRecords[3].id },
    { name: 'Mũ Snapback Nam', sku: 'ACC-002', price: 149999, categoryId: categoryRecords[3].id, brandId: brandRecords[4].id },
    { name: 'Kính Mát Nam Đơn Giản', sku: 'ACC-003', price: 299999, categoryId: categoryRecords[3].id, brandId: brandRecords[0].id },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Seed complete - Đã thêm 4 danh mục, 5 thương hiệu, 12 sản phẩm');
}
main().finally(()=>prisma.$disconnect());
