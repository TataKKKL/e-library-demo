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