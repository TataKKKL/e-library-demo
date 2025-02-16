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
### 3.1 Local Backend
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
### 3.2 Book CRUD
```
# GET all books
curl -X GET http://localhost:3001/api/books/

# GET book by ID
curl -X GET http://localhost:3001/api/books/1

# POST new book (remains the same since we don't specify ID during creation)
curl -X POST http://localhost:3001/api/books \
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

# PUT (update) book by ID (assuming the book ID is 5)
curl -X PUT http://localhost:3001/api/books/21 \
  -H "Content-Type: application/json" \
  -d '{
    "img_url": "https://covers.openlibrary.org/b/id/10730548-M.jpg",
    "source_url": "https://www.google.com/"
  }'

# DELETE book by ID (assuming the book ID is 5)
curl -X DELETE http://localhost:3001/api/books/21
```


```
# GET book by ID
curl -X GET https://e-library-demo-api.vercel.app/api/books/1

# POST new book (remains the same since we don't specify ID during creation)
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

# PUT (update) book by ID (assuming the book ID is 5)
curl -X PUT https://e-library-demo-api.vercel.app/api/books/5 \
  -H "Content-Type: application/json" \
  -d '{
    "img_url": "https://covers.openlibrary.org/b/id/10730548-M.jpg",
    "source_url": "https://www.google.com/"
  }'

# DELETE book by ID (assuming the book ID is 5)
curl -X DELETE https://e-library-demo-api.vercel.app/api/books/5
```

### 3.3 Book likes
```
curl -X POST 'https://[YOUR_SUPABASE_PROJECT_URL]/auth/v1/token?grant_type=password' \
  -H "apikey: [YOUR_SUPABASE_ANON_KEY]" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "danqing0703@gmail.com",
    "password": "123456"
  }'

# Add like for book with ID 123
curl -X POST 'http://localhost:3001/api/book-likes/1/add' \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"

# Remove like for book with ID 123
curl -X DELETE \
  'http://localhost:3001/api/book-likes/1/remove' \
  -H 'Authorization: Bearer your-jwt-token'

# Check like status for book with ID 123
curl -X GET \
  'http://localhost:3001/api/book-likes/1/status' \
  -H 'Authorization: Bearer your-jwt-token'

# Get user's liked books
curl -X GET 'http://localhost:3001/api/book-likes/user' \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"

# Get all likes for book 123 (no auth needed)
curl -X GET 'http://localhost:3001/api/book-likes/1' \
  -H "Content-Type: application/json"

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
since admin and user share the same supabase project, we created row management system and give admin user full access to the database.

## 6. Additional Database Setup

Run the following SQL migrations in your Supabase project:

1. Navigate to the Supabase Dashboard
2. Go to SQL Editor
3. Copy and run the contents of `e-library-app/supabase/migrations/20240214_create_profiles.sql`


