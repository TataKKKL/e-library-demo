import { GetServerSideProps } from 'next';
import Head from 'next/head';
import BooksLayout from '@/components/BooksLayout';
import type { Book } from '@/interfaces/bookInterface';

type BookSummary = Pick<Book, 'id' | 'title' | 'author' | 'created_at'>;

interface HomeProps {
  books: BookSummary[];
}

// Server-side data fetching
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app';
    const res = await fetch(`${baseUrl}/api/books`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch books: ${res.status}`);
    }
    
    const fullBooks: Book[] = await res.json();
    
    // Extract only the necessary summary information
    const books: BookSummary[] = fullBooks.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      created_at: book.created_at
    }));

    return {
      props: {
        books
      }
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      props: {
        books: []
      },
      // Optionally, you could add a revalidate property if you want to attempt fetching again after a certain time
      // revalidate: 60 // in seconds
    };
  }
};

export default function BooksPage({ books }: HomeProps) {
  return (
    <>
      <Head>
        <title>Library | Book Collection</title>
        <meta name="description" content="Browse and manage your book collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">
        <main className="flex-1 overflow-hidden">
          <BooksLayout initialBooks={books} />
        </main>
      </div>
    </>
  );
}