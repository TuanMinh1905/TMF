
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

// Helper function tạo slug từ tên
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  // Xóa dữ liệu cũ (theo thứ tự để tránh lỗi FK)
  await prisma.image.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.user.deleteMany({});

  // ========== SEED USER ADMIN ==========
  const adminPassword = '123456';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  await prisma.user.create({
    data: {
      email: 'admin@tmfashion.com',
      passwordHash: hashedPassword,
      fullName: 'Admin TMFashion',
      role: 'ADMIN',
    },
  });
  console.log('✅ Created admin user: admin@tmfashion.com / 123456');

  // ========== BƯỚC 4.1: Seed category cấp 1 ==========
  const categoriesLevel1 = [
    { name: 'Áo', slug: 'ao', sortOrder: 1, urlImage: '/category_shirt.svg' },
    { name: 'Quần', slug: 'quan', sortOrder: 2, urlImage: '/category_shorts.svg' },
    { name: 'Thắt lưng', slug: 'that-lung', sortOrder: 3, urlImage: '/category_belt.svg' },
    { name: 'Ví', slug: 'vi', sortOrder: 4, urlImage: '/category_glasses.svg' },
    { name: 'Tất', slug: 'tat', sortOrder: 5, urlImage: '/category_socks.svg' },
    { name: 'Mũ', slug: 'mu', sortOrder: 6, urlImage: '/categtory_hat.svg' },
    { name: 'Giày', slug: 'giay', sortOrder: 7, urlImage: '/catgory_shoe.svg' },
  ];

  const level1Records: Record<string, number> = {};
  for (const cat of categoriesLevel1) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        sortOrder: cat.sortOrder,
        urlImage: cat.urlImage,
        parentId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    level1Records[cat.name] = created.id;
  }

  // ========== BƯỚC 4.2: Seed category cấp 2 ==========
  // Con của "Áo"
  const subCategoriesAo = [
    { name: 'Áo thun', slug: 'ao-thun', sortOrder: 1 },
    { name: 'Áo hoodie', slug: 'ao-hoodie', sortOrder: 2 },
    { name: 'Áo khoác', slug: 'ao-khoac', sortOrder: 3 },
    { name: 'Áo ba lỗ', slug: 'ao-ba-lo', sortOrder: 4 },
  ];

  for (const sub of subCategoriesAo) {
    await prisma.category.create({
      data: {
        name: sub.name,
        slug: sub.slug,
        sortOrder: sub.sortOrder,
        parentId: level1Records['Áo'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Con của "Quần"
  const subCategoriesQuan = [
    { name: 'Quần dài', slug: 'quan-dai', sortOrder: 1 },
    { name: 'Quần short', slug: 'quan-short', sortOrder: 2 },
    { name: 'Quần thể thao', slug: 'quan-the-thao', sortOrder: 3 },
  ];

  for (const sub of subCategoriesQuan) {
    await prisma.category.create({
      data: {
        name: sub.name,
        slug: sub.slug,
        sortOrder: sub.sortOrder,
        parentId: level1Records['Quần'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Thắt lưng, Ví, Tất, Mũ - chưa có con

  // ========== Thêm thương hiệu ==========
  const brands = [
    {
      name: 'Nike',
      slug: 'nike',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png',
      description: 'Nike là thương hiệu thể thao hàng đầu thế giới, nổi tiếng với slogan "Just Do It". Sản phẩm Nike kết hợp công nghệ tiên tiến và thiết kế thời trang.'
    },
    {
      name: 'Adidas',
      slug: 'adidas',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png',
      description: 'Adidas là thương hiệu thể thao Đức với biểu tượng 3 sọc đặc trưng. Adidas luôn tiên phong trong công nghệ giày và quần áo thể thao.'
    },
    {
      name: 'H&M',
      slug: 'h-m',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png',
      description: 'H&M là thương hiệu thời trang nhanh đến từ Thụy Điển, mang đến xu hướng mới nhất với giá cả phải chăng cho mọi người.'
    },
    {
      name: 'Zara',
      slug: 'zara',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1200px-Zara_Logo.svg.png',
      description: 'Zara là thương hiệu thời trang Tây Ban Nha thuộc tập đoàn Inditex, nổi tiếng với khả năng cập nhật xu hướng nhanh chóng từ sàn catwalk.'
    },
    {
      name: 'Calvin Klein',
      slug: 'calvin-klein',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Calvin_Klein_logo.svg/1200px-Calvin_Klein_logo.svg.png',
      description: 'Calvin Klein là thương hiệu thời trang cao cấp Mỹ, nổi tiếng với phong cách tối giản, sang trọng và các dòng sản phẩm đồ lót, nước hoa.'
    },
    {
      name: 'Puma',
      slug: 'puma',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_logo.svg/1200px-Puma_logo.svg.png',
      description: 'Puma là thương hiệu thể thao Đức, nổi tiếng với thiết kế năng động và hợp tác với nhiều ngôi sao thể thao, âm nhạc hàng đầu.'
    },
    {
      name: 'Uniqlo',
      slug: 'uniqlo',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/1200px-UNIQLO_logo.svg.png',
      description: 'Uniqlo là thương hiệu thời trang Nhật Bản, nổi tiếng với quần áo cơ bản chất lượng cao, công nghệ vải tiên tiến như HeatTech và AIRism.'
    },
    {
      name: 'Gucci',
      slug: 'gucci',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gucci_logo.svg/1200px-Gucci_logo.svg.png',
      description: 'Gucci là thương hiệu xa xỉ Ý, biểu tượng của sự sang trọng và đẳng cấp với các thiết kế độc đáo, táo bạo.'
    },
    {
      name: 'Louis Vuitton',
      slug: 'louis-vuitton',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Louis_Vuitton_logo_and_wordmark.svg/1200px-Louis_Vuitton_logo_and_wordmark.svg.png',
      description: 'Louis Vuitton là thương hiệu xa xỉ Pháp hàng đầu thế giới, nổi tiếng với túi xách, vali và phụ kiện cao cấp.'
    },
    {
      name: 'Levi\'s',
      slug: 'levis',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Levis-logo.svg/1200px-Levis-logo.svg.png',
      description: 'Levi\'s là thương hiệu jeans lâu đời nhất thế giới từ Mỹ, biểu tượng của phong cách casual và bền bỉ.'
    },
    {
      name: 'Tommy Hilfiger',
      slug: 'tommy-hilfiger',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Tommy_Hilfiger_logo.svg/1200px-Tommy_Hilfiger_logo.svg.png',
      description: 'Tommy Hilfiger là thương hiệu thời trang Mỹ với phong cách preppy cổ điển, kết hợp giữa sang trọng và năng động.'
    },
    {
      name: 'Ralph Lauren',
      slug: 'ralph-lauren',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ralph_Lauren_Logo.svg/1200px-Ralph_Lauren_Logo.svg.png',
      description: 'Ralph Lauren là thương hiệu thời trang cao cấp Mỹ, nổi tiếng với polo shirt và phong cách preppy thanh lịch.'
    },
    {
      name: 'The North Face',
      slug: 'the-north-face',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/The_North_Face_logo.svg/1200px-The_North_Face_logo.svg.png',
      description: 'The North Face là thương hiệu đồ outdoor hàng đầu, chuyên về quần áo và thiết bị cho các hoạt động thể thao mạo hiểm.'
    },
    {
      name: 'Converse',
      slug: 'converse',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/1200px-Converse_logo.svg.png',
      description: 'Converse là thương hiệu giày Mỹ huyền thoại với mẫu Chuck Taylor All Star, biểu tượng của văn hóa đường phố.'
    },
    {
      name: 'Vans',
      slug: 'vans',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vans-logo.svg/1200px-Vans-logo.svg.png',
      description: 'Vans là thương hiệu giày skateboard từ California, gắn liền với văn hóa trượt ván và phong cách streetwear.'
    },
    {
      name: 'New Balance',
      slug: 'new-balance',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/1200px-New_Balance_logo.svg.png',
      description: 'New Balance là thương hiệu giày thể thao Mỹ, nổi tiếng với sự thoải mái và chất lượng sản xuất tại Mỹ.'
    },
    {
      name: 'Under Armour',
      slug: 'under-armour',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Under_armour_logo.svg/1200px-Under_armour_logo.svg.png',
      description: 'Under Armour là thương hiệu đồ thể thao Mỹ, chuyên về quần áo công nghệ cao cho vận động viên chuyên nghiệp.'
    },
    {
      name: 'Lacoste',
      slug: 'lacoste',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lacoste_logo.svg/1200px-Lacoste_logo.svg.png',
      description: 'Lacoste là thương hiệu thời trang Pháp với biểu tượng cá sấu, nổi tiếng với áo polo và phong cách thể thao thanh lịch.'
    },
    {
      name: 'Burberry',
      slug: 'burberry',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Burberry_logo.svg/1200px-Burberry_logo.svg.png',
      description: 'Burberry là thương hiệu xa xỉ Anh Quốc, nổi tiếng với họa tiết kẻ sọc đặc trưng và áo trench coat huyền thoại.'
    },
    {
      name: 'Versace',
      slug: 'versace',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Versace_logo.svg/1200px-Versace_logo.svg.png',
      description: 'Versace là thương hiệu thời trang xa xỉ Ý, nổi tiếng với thiết kế táo bạo, màu sắc rực rỡ và họa tiết Medusa.'
    },
    {
      name: 'Fila',
      slug: 'fila',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Fila_logo.svg/1200px-Fila_logo.svg.png',
      description: 'Fila là thương hiệu thể thao Ý-Hàn, nổi tiếng với phong cách retro và giày chunky sneaker thời thượng.'
    },
    {
      name: 'Champion',
      slug: 'champion',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Champion_Athleticwear_Logo.svg/1200px-Champion_Athleticwear_Logo.svg.png',
      description: 'Champion là thương hiệu đồ thể thao Mỹ lâu đời, nổi tiếng với áo hoodie và phong cách vintage streetwear.'
    },
    {
      name: 'Gap',
      slug: 'gap',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Gap_logo.svg/1200px-Gap_logo.svg.png',
      description: 'Gap là thương hiệu thời trang Mỹ, chuyên về quần áo casual cơ bản với chất lượng tốt và giá cả hợp lý.'
    },
    {
      name: 'Mango',
      slug: 'mango',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/MANGO_logo.svg/1200px-MANGO_logo.svg.png',
      description: 'Mango là thương hiệu thời trang Tây Ban Nha, nổi tiếng với thiết kế nữ tính, thanh lịch cho phụ nữ hiện đại.'
    },
    {
      name: 'Massimo Dutti',
      slug: 'massimo-dutti',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Massimo_Dutti_logo.svg/1200px-Massimo_Dutti_logo.svg.png',
      description: 'Massimo Dutti là thương hiệu thời trang cao cấp thuộc tập đoàn Inditex, chuyên về phong cách công sở sang trọng.'
    },
  ];

  const brandRecords: Record<string, number> = {};
  for (const brand of brands) {
    const created = await prisma.brand.create({
      data: {
        name: brand.name,
        slug: brand.slug,
        logoUrl: brand.logoUrl,
        description: brand.description,
      }
    });
    brandRecords[brand.name] = created.id;
  }

  // ========== Thêm sản phẩm mẫu ==========
  // Lấy lại category để dùng cho products
  const allCategories = await prisma.category.findMany();
  const getCatId = (name: string) => allCategories.find(c => c.name === name)?.id || 1;

  const products = [
    // Áo thun
    { 
      name: 'Áo Thun Nam Cơ Bản', 
      title: 'Áo Thun Nam Cotton 100% Thoáng Mát',
      alias: 'ao-thun-nam-co-ban',
      sku: 'SHIRT-001', 
      price: 199000, 
      compareAtPrice: 299000,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      description: 'Áo thun nam cotton 100% mềm mại, thoáng mát cho mùa hè',
      categoryId: getCatId('Áo thun'), 
      brandId: brandRecords['Nike'] 
    },
    { 
      name: 'Áo Thun Trắng Basic', 
      title: 'Áo Thun Trắng Form Rộng Unisex',
      alias: 'ao-thun-trang-basic',
      sku: 'SHIRT-002', 
      price: 159000, 
      compareAtPrice: 250000,
      imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
      description: 'Áo thun trắng basic form rộng phù hợp cả nam và nữ',
      categoryId: getCatId('Áo thun'), 
      brandId: brandRecords['Uniqlo'] 
    },
    // Áo hoodie
    { 
      name: 'Áo Hoodie Oversize', 
      title: 'Áo Hoodie Oversize Nỉ Bông Ấm Áp',
      alias: 'ao-hoodie-oversize',
      sku: 'HOODIE-001', 
      price: 349000, 
      compareAtPrice: 499000,
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
      description: 'Áo hoodie oversize chất nỉ bông dày dặn giữ ấm tốt',
      categoryId: getCatId('Áo hoodie'), 
      brandId: brandRecords['Adidas'] 
    },
    { 
      name: 'Hoodie Zip Nam', 
      title: 'Áo Hoodie Zip Thể Thao Nam',
      alias: 'hoodie-zip-nam',
      sku: 'HOODIE-002', 
      price: 399000, 
      compareAtPrice: 550000,
      imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
      description: 'Hoodie zip phong cách thể thao năng động',
      categoryId: getCatId('Áo hoodie'), 
      brandId: brandRecords['Puma'] 
    },
    // Áo khoác
    { 
      name: 'Áo Khoác Jean Nam', 
      title: 'Áo Khoác Jean Denim Vintage',
      alias: 'ao-khoac-jean-nam',
      sku: 'JACKET-001', 
      price: 499000, 
      compareAtPrice: 750000,
      imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
      description: 'Áo khoác jean phong cách vintage cực chất',
      categoryId: getCatId('Áo khoác'), 
      brandId: brandRecords['Levi\'s'] 
    },
    { 
      name: 'Áo Khoác Bomber', 
      title: 'Áo Khoác Bomber Nam Phong Cách',
      alias: 'ao-khoac-bomber',
      sku: 'JACKET-002', 
      price: 599000, 
      compareAtPrice: 850000,
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
      description: 'Áo khoác bomber thời trang street style',
      categoryId: getCatId('Áo khoác'), 
      brandId: brandRecords['Zara'] 
    },
    // Quần dài
    { 
      name: 'Quần Jeans Xanh Nam', 
      title: 'Quần Jeans Slim Fit Xanh Đậm',
      alias: 'quan-jeans-xanh-nam',
      sku: 'PANTS-001', 
      price: 399000, 
      compareAtPrice: 599000,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      description: 'Quần jeans slim fit co giãn thoải mái',
      categoryId: getCatId('Quần dài'), 
      brandId: brandRecords['Levi\'s'] 
    },
    { 
      name: 'Quần Tây Nam Đen', 
      title: 'Quần Tây Công Sở Nam Cao Cấp',
      alias: 'quan-tay-nam-den',
      sku: 'PANTS-002', 
      price: 450000, 
      compareAtPrice: 650000,
      imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
      description: 'Quần tây công sở lịch lãm cho nam giới',
      categoryId: getCatId('Quần dài'), 
      brandId: brandRecords['Massimo Dutti'] 
    },
    // Quần short
    { 
      name: 'Quần Short Nam Mùa Hè', 
      title: 'Quần Short Kaki Nam Thoáng Mát',
      alias: 'quan-short-nam-mua-he',
      sku: 'SHORT-001', 
      price: 249000, 
      compareAtPrice: 350000,
      imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
      description: 'Quần short kaki nhẹ nhàng cho mùa hè',
      categoryId: getCatId('Quần short'), 
      brandId: brandRecords['H&M'] 
    },
    { 
      name: 'Quần Short Thể Thao', 
      title: 'Quần Short Thể Thao Nam Năng Động',
      alias: 'quan-short-the-thao',
      sku: 'SHORT-002', 
      price: 199000, 
      compareAtPrice: 299000,
      imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
      description: 'Quần short thể thao thoáng khí cho gym',
      categoryId: getCatId('Quần short'), 
      brandId: brandRecords['Nike'] 
    },
    // Quần thể thao
    { 
      name: 'Quần Jogger Nam', 
      title: 'Quần Jogger Thể Thao Phong Cách',
      alias: 'quan-jogger-nam',
      sku: 'JOGGER-001', 
      price: 329000, 
      compareAtPrice: 450000,
      imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500',
      description: 'Quần jogger thoải mái cho hoạt động thể thao',
      categoryId: getCatId('Quần thể thao'), 
      brandId: brandRecords['Adidas'] 
    },
    // Thắt lưng
    { 
      name: 'Thắt Lưng Da Bò', 
      title: 'Thắt Lưng Da Bò Thật 100%',
      alias: 'that-lung-da-bo',
      sku: 'BELT-001', 
      price: 299000, 
      compareAtPrice: 450000,
      imageUrl: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500',
      description: 'Thắt lưng da bò thật cao cấp bền đẹp',
      categoryId: getCatId('Thắt lưng'), 
      brandId: brandRecords['Calvin Klein'] 
    },
    // Ví
    { 
      name: 'Ví Da Nam Cao Cấp', 
      title: 'Ví Da Nam Dáng Ngang Sang Trọng',
      alias: 'vi-da-nam-cao-cap',
      sku: 'WALLET-001', 
      price: 399000, 
      compareAtPrice: 599000,
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
      description: 'Ví da nam thiết kế tinh tế nhiều ngăn',
      categoryId: getCatId('Ví'), 
      brandId: brandRecords['Tommy Hilfiger'] 
    },
    // Tất
    { 
      name: 'Tất Nam Cotton', 
      title: 'Set 5 Đôi Tất Nam Cotton Cao Cấp',
      alias: 'tat-nam-cotton',
      sku: 'SOCK-001', 
      price: 99000, 
      compareAtPrice: 150000,
      imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500',
      description: 'Bộ 5 đôi tất cotton thấm hút mồ hôi tốt',
      categoryId: getCatId('Tất'), 
      brandId: brandRecords['Uniqlo'] 
    },
    // Mũ
    { 
      name: 'Mũ Snapback Nam', 
      title: 'Mũ Snapback Thêu Logo Cá Tính',
      alias: 'mu-snapback-nam',
      sku: 'HAT-001', 
      price: 179000, 
      compareAtPrice: 250000,
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
      description: 'Mũ snapback phong cách street style',
      categoryId: getCatId('Mũ'), 
      brandId: brandRecords['New Balance'] 
    },
    { 
      name: 'Mũ Bucket Hat', 
      title: 'Mũ Bucket Hat Thời Trang',
      alias: 'mu-bucket-hat',
      sku: 'HAT-002', 
      price: 159000, 
      compareAtPrice: 220000,
      imageUrl: 'https://images.unsplash.com/photo-1572460403-2ef8526c4f21?w=500',
      description: 'Mũ bucket trendy cho mùa hè',
      categoryId: getCatId('Mũ'), 
      brandId: brandRecords['Fila'] 
    },
    // Giày
    { 
      name: 'Giày Sneaker Trắng', 
      title: 'Giày Sneaker Trắng Classic Nam',
      alias: 'giay-sneaker-trang',
      sku: 'SHOES-001', 
      price: 899000, 
      compareAtPrice: 1299000,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
      description: 'Giày sneaker trắng cổ điển đa năng',
      categoryId: getCatId('Giày'), 
      brandId: brandRecords['Nike'] 
    },
    { 
      name: 'Giày Chạy Bộ', 
      title: 'Giày Chạy Bộ Ultra Boost Nam',
      alias: 'giay-chay-bo',
      sku: 'SHOES-002', 
      price: 1499000, 
      compareAtPrice: 2200000,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      description: 'Giày chạy bộ đệm êm công nghệ Boost',
      categoryId: getCatId('Giày'), 
      brandId: brandRecords['Adidas'] 
    },
    { 
      name: 'Giày Vans Old Skool', 
      title: 'Giày Vans Old Skool Classic',
      alias: 'giay-vans-old-skool',
      sku: 'SHOES-003', 
      price: 1299000, 
      compareAtPrice: 1600000,
      imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
      description: 'Giày Vans Old Skool huyền thoại',
      categoryId: getCatId('Giày'), 
      brandId: brandRecords['Vans'] 
    },
    { 
      name: 'Giày Converse High Top', 
      title: 'Giày Converse Chuck Taylor Cổ Cao',
      alias: 'giay-converse-high-top',
      sku: 'SHOES-004', 
      price: 1099000, 
      compareAtPrice: 1500000,
      imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500',
      description: 'Giày Converse cổ cao phong cách vintage',
      categoryId: getCatId('Giày'), 
      brandId: brandRecords['Converse'] 
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Seed complete!');
  console.log('   - 1 admin user (admin@tmfashion.com / 123456)');
  console.log('   - 7 category cấp 1');
  console.log('   - 7 category cấp 2 (4 con Áo + 3 con Quần)');
  console.log('   - 25 thương hiệu');
  console.log('   - 20 sản phẩm mẫu');
}

main().finally(() => prisma.$disconnect());
