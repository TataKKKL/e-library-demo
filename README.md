# e-library-demo

A full-stack NextJS application that provides an interactive library interface.

## Tech Stack

- **Frontend**
  - NextJS 14
  - TailwindCSS
  - Shadcn UI Components

- **Backend**
  - Node.js

- **Database**
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