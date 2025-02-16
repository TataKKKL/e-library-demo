import React from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type { User } from '@supabase/supabase-js';
import { withServerPropsAuth } from '@/utils/auth/authServerPropsHandler';
import BooksLayout from '@/components/BooksLayout';
import type { Book } from '@/interfaces/bookInterface';

type BookSummary = Pick<Book, 'id' | 'title' | 'author' | 'created_at'>;

interface BooksPageProps {
  user: User;
  books: BookSummary[];
}

const BooksPage: React.FC<BooksPageProps> = ({ user, books }) => {
  console.log('[BooksPage] Rendering with user:', user);
  console.log('[BooksPage] Books:', books);

  return (
    <>
      <Head>
        <title>Library | Book Collection</title>
        <meta name="description" content="Browse and manage your book collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="p-8 mb-8">
          <h1 className="text-3xl font-bold">Book Collection</h1>
          <p className="text-muted-foreground">Welcome back, {user.email}!</p>
        </div>

        <main className="flex-1 overflow-hidden">
          <BooksLayout initialBooks={books} />
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log('[getServerSideProps] Starting books data fetch');

  // Get the Supabase cookie name
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF || process.env.SUPABASE_PROJECT_ID;
  const cookieName = `sb-${projectRef}-auth-token`;
  console.log('[getServerSideProps] Looking for cookie:', cookieName);
  console.log('[getServerSideProps] Cookie value:', context.req.cookies[cookieName]);

  return withServerPropsAuth(context, async (user, accessToken) => {
    // If no user is found, handle the redirect at a higher level
    if (!user || !accessToken) {
      console.log('[getServerSideProps] No authenticated user found');
      return { props: undefined };
    }

    try {
      console.log('[getServerSideProps] Fetching books for authenticated user');
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app';
      const res = await fetch(`${baseUrl}/api/books`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch books: ${res.status}`);
      }
      
      const fullBooks: Book[] = await res.json();
      const books: BookSummary[] = fullBooks.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        created_at: book.created_at
      }));

      return {
        props: {
          user,
          books,
        },
      };
    } catch (error) {
      console.error('[getServerSideProps] Error fetching books:', error);
      return {
        props: {
          user,
          books: [],
        },
      };
    }
  });
};

export default BooksPage;