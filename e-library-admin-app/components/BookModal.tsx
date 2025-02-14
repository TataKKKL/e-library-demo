import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Book } from '@/interfaces/bookInterface';

type BookFormData = Omit<Book, 'id' | 'created_at' | 'free'>;

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: Book) => void;
}

const initialBookData: BookFormData = {
  title: '',
  author: '',
  overview: '',
  genre: '',
  publication_date: 0,
  rating: 0,
  places: '',
  img_url: 'https://covers.openlibrary.org/b/id/10730548-M.jpg',
  source_url: 'https://www.google.com/'
};

export default function BookModal({ isOpen, onClose, onSubmit }: BookModalProps) {
  const [newBook, setNewBook] = useState<BookFormData>(initialBookData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log('Submitting book data:', newBook);

    try {
      const response = await fetch('https://e-library-demo-api.vercel.app/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newBook),
      });

      const responseData = await response.text();
      let parsedData;
      
      try {
        parsedData = JSON.parse(responseData);
      } catch {
        console.error('Failed to parse response:', responseData);
      }

      if (!response.ok) {
        const errorMessage = parsedData?.message || responseData || `Server error: ${response.status}`;
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        throw new Error(errorMessage);
      }

      onSubmit(parsedData);
      setNewBook(initialBookData);
    } catch (err) {
      console.error('Error submitting book:', err);
      setError(
        err instanceof Error 
          ? `Failed to create book: ${err.message}` 
          : 'An unexpected error occurred while creating the book'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberInput = (field: keyof BookFormData, value: string) => {
    const numberValue = value === '' ? 0 : Number(value);
    setNewBook({ ...newBook, [field]: numberValue });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Book</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Overview
            </label>
            <textarea
              value={newBook.overview}
              onChange={(e) =>
                setNewBook({ ...newBook, overview: e.target.value })
              }
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <input
                type="text"
                value={newBook.genre}
                onChange={(e) =>
                  setNewBook({ ...newBook, genre: e.target.value })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publication Year
              </label>
              <input
                type="number"
                value={newBook.publication_date || ''}
                onChange={(e) => handleNumberInput('publication_date', e.target.value)}
                min="1000"
                max={new Date().getFullYear()}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={newBook.rating || ''}
                onChange={(e) => handleNumberInput('rating', e.target.value)}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Places
              </label>
              <input
                type="text"
                value={newBook.places}
                onChange={(e) =>
                  setNewBook({ ...newBook, places: e.target.value })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                value={newBook.img_url}
                onChange={(e) =>
                  setNewBook({ ...newBook, img_url: e.target.value })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com/book-cover.jpg"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Source URL
              </label>
              <input
                type="url"
                value={newBook.source_url}
                onChange={(e) =>
                  setNewBook({ ...newBook, source_url: e.target.value })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com/book-page"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}