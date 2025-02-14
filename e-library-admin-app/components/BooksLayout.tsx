// components/BooksLayout.tsx
import React, { useState } from 'react';
import type { Book } from '@/interfaces/bookInterface';
import BookModal from './BookModal';

type BookSummary = Pick<Book, 'id' | 'title' | 'author'>;

interface BooksLayoutProps {
  initialBooks: BookSummary[];
}

export default function BooksLayout({ initialBooks }: BooksLayoutProps) {
  const [books, setBooks] = useState<BookSummary[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app';
      const response = await fetch(`${baseUrl}/api/books`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const fullBooks = await response.json();
      const bookSummaries: BookSummary[] = fullBooks.map((book: Book) => ({
        id: book.id,
        title: book.title,
        author: book.author
      }));
      setBooks(bookSummaries);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchBookDetails = async (title: string) => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app';
      const response = await fetch(`${baseUrl}/api/books/${encodeURIComponent(title)}`);
      if (!response.ok) throw new Error('Failed to fetch book details');
      const bookData = await response.json();
      setSelectedBook(bookData);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setSelectedBook(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder-book.jpg';
  };

  const handleCreateBook = async (bookData: Book) => {
    console.log('New book data:', bookData);
    await fetchBooks(); // Refresh the books list after creating a new book
    setIsModalOpen(false);
    // If the newly created book is available, select it
    if (bookData.title) {
      await fetchBookDetails(bookData.title);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Home</span>
              <span>/</span>
              <span className="text-gray-900">Library</span>
              <span className="ml-4 px-2 py-1 bg-gray-100 rounded">
                {books.length} books
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create New Book
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left column: Book list */}
        <div className="w-72 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Library</h2>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-10rem)]">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => fetchBookDetails(book.title)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  book.id === selectedBook?.id ? 'bg-blue-50' : ''
                }`}
              >
                <h3 className="font-medium">{book.title}</h3>
                <small className="text-gray-600">{book.author}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Book details */}
        <div className="flex-1 bg-gray-50 p-4">
          {isLoading ? (
            <div className="text-center p-8">Loading book details...</div>
          ) : selectedBook ? (
            <div className="flex gap-4">
              <div className="w-32 h-48 overflow-hidden relative">
                <img
                  src={selectedBook.img_url}
                  alt={selectedBook.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{selectedBook.title}</h2>
                <p className="text-gray-600 mt-1">{selectedBook.author}</p>

                {selectedBook.rating > 0 && (
                  <p className="mt-2">
                    Rating: <strong>{selectedBook.rating}</strong>
                  </p>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  Published: {selectedBook.publication_date}
                  {!!selectedBook.places && selectedBook.places !== 'N/A' && (
                    <> • Places: {selectedBook.places}</>
                  )}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold">Overview</h3>
                  <p className="mt-1 text-gray-700">{selectedBook.overview}</p>
                </div>

                {selectedBook.genre && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Genre</h3>
                    <p className="mt-1 text-gray-700">{selectedBook.genre}</p>
                  </div>
                )}

                {selectedBook.source_url && (
                  <p className="mt-4">
                    <a
                      href={selectedBook.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Source
                    </a>
                  </p>
                )}

                <p className="mt-4 text-sm text-gray-500">
                  Added on {new Date(selectedBook.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Select a book to view details
            </div>
          )}
        </div>
      </div>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBook}
      />
    </div>
  );
}