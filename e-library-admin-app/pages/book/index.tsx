// pages/index.tsx
import BooksLayout from '@/components/BooksLayout'
import type { Book } from '@/interfaces/bookInterface'

interface BookSummary {
  id: number;
  title: string;
  author: string;
}

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app'
    
    const res = await fetch(`${baseUrl}/api/books`)
    if (!res.ok) {
      throw new Error('Failed to fetch books')
    }
    const fullBooks = await res.json()
    
    // Extract only the necessary summary information
    const books: BookSummary[] = fullBooks.map((book: Book) => ({
      id: book.id,
      title: book.title,
      author: book.author
    }))

    return { props: { books } }
  } catch (error) {
    console.error('Error fetching books:', error)
    return { props: { books: [] } }
  }
}

function BooksPage({ books }: { books: BookSummary[] }) {
  return (
    <main className="flex-1 overflow-hidden">
      <BooksLayout initialBooks={books} />
    </main>
  )
}

export default BooksPage
