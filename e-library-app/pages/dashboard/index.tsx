import React from 'react';
import Link from 'next/link';
import type { GetServerSidePropsContext } from 'next';
import type { User } from '@supabase/supabase-js';
import { withServerPropsAuth, makeServerPropsAuthRequest } from '@/utils/auth/authServerPropsHandler';

interface LikedBook {
  profile_id: string;
  book_id: number;
  created_at: string;
}

interface UserDashboardProps {
  user: User;
  likedBooks: LikedBook[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, likedBooks }) => {
  console.log('[UserDashboard] Rendering with user:', user);
  console.log('[UserDashboard] Liked books:', likedBooks);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Library</h1>
        <p className="text-muted-foreground">Welcome back, {user.email}!</p>
      </div>

      {/* Liked Books Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Liked Books</h2>

        {likedBooks.length === 0 ? (
          <div className="text-muted-foreground">You haven&apos;t liked any books yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedBooks.map((book) => (
              <Link
                key={book.book_id}
                href={`/book/${encodeURIComponent(book.book_id)}`}
                className="block"
              >
                <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-semibold">Book ID: {book.book_id}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log('[getServerSideProps] Starting dashboard data fetch');
  console.log('[getServerSideProps] Cookies:', context.req.cookies);

  // Get the Supabase cookie name
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF || process.env.SUPABASE_PROJECT_ID;
  const cookieName = `sb-${projectRef}-auth-token`;

  console.log('[getServerSideProps] Looking for cookie:', cookieName);
  console.log('[getServerSideProps] Cookie value:', context.req.cookies[cookieName]);

  return withServerPropsAuth(context, async (user, accessToken) => {
    console.log('[getServerSideProps] Auth check - User:', !!user);
    console.log('[getServerSideProps] Auth check - Token:', !!accessToken);

    try {
      console.log('[getServerSideProps] Fetching liked books');

      const likedBooks = await makeServerPropsAuthRequest(
        context,
        '/api/book-likes/user'
      );

      console.log('[getServerSideProps] Fetched liked books:', likedBooks);

      return {
        props: {
          user,
          likedBooks,
        },
      };
    } catch (error) {
      console.error('[getServerSideProps] Error fetching liked books:', error);
      return {
        props: {
          user,
          likedBooks: [],
        },
      };
    }
  });
};