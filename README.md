# e-library-demo

A full-stack NextJS application that provides an interactive library interface.

## Tech Stack

- **Frontend**
  - NextJS 14
  - TailwindCSS
  - Shadcn UI Components

- **Backend**
  - Express.js

- **Database**
  - Supabase

- **ORM**
  - Prisma

- **Authentication**
  - Supabase

- **Deployment**
  - Vercel

https://github.com/TataKKKL/e-library

## 1. Setup

### 1.1 Create .env file

create .env file
```
SUPABASE_KEY=
SUPABASE_PROJECT_ID=
SUPABASE_URL=
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
GITHUB_ACCESS_TOKEN=
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
```
### 1.2 ORM with Prisma
Add the following to .env file to use Prisma to connect to Supabase for database operations.
```
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=

# Direct connection to the database. Used for migrations.
DIRECT_URL=
```
for migration:
```
npx prisma migrate dev --name create_books_table
```
for seeding:
```
npx prisma db seed
```

## 3. Backend
* local backend
install dependencies:
```
npm install
```
Start the development server:
```
vercel dev --listen 3001
```
test the hello endpoint:
```
curl -X GET http://localhost:3001/api/hello
{"name":"John Doe"}%
```
* production backend
production backend url: https://e-library-demo-api.vercel.app

test the hello endpoint:
```
curl -X GET https://e-library-demo-api.vercel.app/api/hello
{"name":"John Doe"}%
```
test the get book by title endpoint:
```
curl -X GET https://e-library-demo-api.vercel.app/api/books/The%20Last%20Olympian 
{"id":1,"title":"The Last Olympian","author":"Rick Riordan and Robert Venditti","genre":"Fiction and Greek Mythology","overview":"The greatest monster of all, the storm giant Typhon, is on the loose, wreaking havoc and destruction across the U.S. - while Kronos's army lays siege to Manhattan. Soon Percy Jackson must make the hardest choice of his life - a choice that will save or destroy the world.","rating":4.29,"publication_date":2009,"places":"United States of America","img_url":"https://covers.openlibrary.org/b/id/6624107-M.jpg","source_url":"https://openlibrary.org/works/OL492642W/The_last_Olympian?edition=ia%3Alastolympianperc00rior_740","created_at":"2025-02-08T08:34:47.514"}%
```

```
curl -X POST https://e-library-demo-api.vercel.app/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Book",
    "author": "Author Name",
    "genre": "Fiction",
    "overview": "Book description",
    "rating": 4.5,
    "publication_date": 2025,
    "places": "Location",
    "img_url": "https://example.com/image.jpg",
    "source_url": "https://example.com/source"
  }'

curl -X PUT https://e-library-demo-api.vercel.app/api/books/New%20Book \
  -H "Content-Type: application/json" \
  -d '{
    "img_url": "https://covers.openlibrary.org/b/id/10730548-M.jpg",
    "source_url": "https://www.google.com/"
  }'

curl -X DELETE https://e-library-demo-api.vercel.app/api/books/New%20Book
```

## 4. User Portal
https://e-library-demo.vercel.app/

```
npm run dev
```

## 5. Admin Portal
https://e-library-admin-demo.vercel.app/

```
npm run dev
```

## 6. Additional Database Setup

Run the following SQL migrations in your Supabase project:

1. Navigate to the Supabase Dashboard
2. Go to SQL Editor
3. Copy and run the contents of `e-library-app/supabase/migrations/20240214_create_profiles.sql`


