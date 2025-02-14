// pages/index.tsx

import BooksLayout from '@/components/BooksLayout'
import type { Book } from '@/interfaces/bookInterface'

// This code runs on the server every time a user requests this page.
export async function getServerSideProps() {
  try {
    // If you are using an .env variable for the backend URL,
    // otherwise just hard-code it here (e.g., 'http://localhost:3000').
    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      'http://localhost:3000' // fallback if needed

    // Fetch the books from your backend
    const res = await fetch(`${baseUrl}/api/books`)
    if (!res.ok) {
      throw new Error('Failed to fetch books')
    }
    const books: Book[] = await res.json()

    return { props: { books } }
  } catch (error) {
    console.error('Error fetching books:', error)
    // Return an empty array or handle the error however you prefer
    return { props: { books: [] } }
  }
}

// Because we've already fetched data server-side,
// the component below is a normal React component
// that receives "books" in its props.
function BooksPage({ books }: { books: Book[] }) {
  return (
    <main className="flex-1 overflow-hidden">
      <BooksLayout initialBooks={books} />
    </main>
  )
}

export default BooksPage
