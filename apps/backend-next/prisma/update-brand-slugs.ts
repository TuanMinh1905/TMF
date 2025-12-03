// Script to update slug for existing brands
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim();
}

async function updateBrandSlugs() {
  const brands = await prisma.brand.findMany();
  
  console.log(`Found ${brands.length} brands to update`);
  
  for (const brand of brands) {
    const slug = generateSlug(brand.name);
    await prisma.brand.update({
      where: { id: brand.id },
      data: { slug },
    });
    console.log(`Updated brand "${brand.name}" -> slug: "${slug}"`);
  }
  
  console.log('Done!');
}

updateBrandSlugs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
