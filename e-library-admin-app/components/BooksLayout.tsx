import React, { useState } from 'react';
import type { Book } from '@/interfaces/bookInterface';
import BookModal from './BookModal';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';

type BookSummary = Pick<Book, 'id' | 'title' | 'author' | 'created_at'>;

interface BooksLayoutProps {
  initialBooks: BookSummary[];
}

export default function BooksLayout({ initialBooks }: BooksLayoutProps) {
  const [books, setBooks] = useState<BookSummary[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookIds, setSelectedBookIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchBookDetails = async (id: number) => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app';
      const response = await fetch(`${baseUrl}/api/books/${id}`);
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
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app';
      const response = await fetch(`${baseUrl}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) throw new Error('Failed to create book');
      
      const newBook = await response.json();
      setBooks(prevBooks => [...prevBooks, {
        id: newBook.id,
        title: newBook.title,
        author: newBook.author,
        created_at: newBook.created_at
      }]);
      
      setIsModalOpen(false);
      if (newBook.id) {
        await fetchBookDetails(newBook.id);
      }
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const toggleBookSelection = (bookId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newSelectedBooks = new Set(selectedBookIds);
    if (newSelectedBooks.has(bookId)) {
      newSelectedBooks.delete(bookId);
    } else {
      newSelectedBooks.add(bookId);
    }
    setSelectedBookIds(newSelectedBooks);
  };

  const handleRemoveSelected = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e-library-demo-api.vercel.app';
    
    try {
      const selectedBooks = books.filter(book => selectedBookIds.has(String(book.id)));
      
      const deletePromises = selectedBooks.map(async (book) => {
        const response = await fetch(`${baseUrl}/api/books/${encodeURIComponent(book.title)}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Failed to delete book ${book.title}`);
      });

      await Promise.all(deletePromises);
      
      // Update local state after successful deletion
      setBooks(prevBooks => prevBooks.filter(book => !selectedBookIds.has(String(book.id))));
      setSelectedBookIds(new Set());
      if (selectedBook && selectedBookIds.has(String(selectedBook.id))) {
        setSelectedBook(null);
      }
    } catch (error) {
      console.error('Error removing books:', error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedBooks = [...books].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

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
            <div className="flex items-center space-x-4">
              {selectedBookIds.size > 0 && (
                <button
                  onClick={handleRemoveSelected}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Selected ({selectedBookIds.size})
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create New Book
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left column: Book list */}
        <div className="w-72 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Library</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                    {sortOrder === 'asc' ? 'Earliest first' : 'Latest first'}
                    </span>
                    <button
                    onClick={toggleSortOrder}
                    className="p-1 hover:bg-gray-100 rounded flex items-center gap-1"
                    title="Sort by creation date"
                    >
                    {sortOrder === 'asc' ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                    </button>
                </div>
                </div>
            </div>

          <div className="overflow-y-auto h-[calc(100vh-10rem)]">
            {sortedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => fetchBookDetails(book.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  book.id === selectedBook?.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedBookIds.has(String(book.id))}
                    onChange={(e) => toggleBookSelection(String(book.id), e as unknown as React.MouseEvent)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <div>
                    <h3 className="font-medium">{book.title}</h3>
                    <small className="text-gray-600">{book.author}</small>
                    <div className="text-xs text-gray-400">
                      Added {new Date(book.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
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