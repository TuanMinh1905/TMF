
# Fashion CRUD — Local First (Nuxt 3 + Next.js + SQL Server)

**Mục tiêu:** chạy Frontend (Nuxt 3) và Backend (Next.js + Prisma) **trực tiếp trên máy**. Database: **SQL Server**.

> Không dùng Docker cho FE/BE. Riêng SQL Server bạn có thể cài **bản Developer** (Windows) hoặc dùng **Docker chỉ cho DB** nếu bạn ở macOS/Linux.

---

## 0) Cài công cụ cần thiết

### A. Runtime & IDE
- **Node.js 20 LTS** (khuyên cài qua **nvm**/**Volta**)
- **VS Code** + extensions: *ESLint*, *Prettier*, *Prisma*
- Trình REST: *Thunder Client* (VS Code) hoặc *Postman*

### B. SQL Server + công cụ quản lý
- **Windows**: **SQL Server Developer** + **SSMS** (hoặc **Azure Data Studio**).
- **macOS/Linux**: dùng **Docker** cho SQL Server hoặc WSL/VM.
- Cài **sqlcmd** (mssql-tools) để chạy script nhanh.

---

## 1) Tạo Database `FashionDB` (một lần)

### Cách 1: Dùng script (khuyên dùng)
- **Windows:**
```bat
scripts\sql\create-db-windows.bat
```
- **macOS/Linux:**
```bash
bash scripts/sql/create-db-unix.sh
```

### Cách 2: Chạy thủ công
```sql
IF DB_ID('FashionDB') IS NULL CREATE DATABASE FashionDB; GO
```

---

## 2) Backend — Next.js + Prisma

```bash
cd apps/backend-next
cp .env.example .env
npm i
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev    # http://localhost:3000
```

**API:** `/api/products`, `/api/categories`, `/api/brands` (CRUD, đã có CORS).

---

## 3) Frontend — Nuxt 3

```bash
cd ../frontend-nuxt
npm i
NUXT_PUBLIC_API_BASE=http://localhost:3000/api npm run dev   # http://localhost:5173
```

Mở **http://localhost:5173/products** để CRUD.

---

## 4) Gợi ý luyện tập
- Thêm `description`, `thumbnail` cho Product → migrate, sửa form.
- Thêm search, filter theo brand/category.
- Hiển thị lỗi validate từ BE (Zod) ở FE.

## 5) Note công cụ
- link kiếm font : https://icon-sets.iconify.design/?query=branch
