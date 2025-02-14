import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Book } from '@/interfaces/bookInterface';

// Update type to include img_url and source_url
type BookFormData = Omit<Book, 'id' | 'created_at'>;

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: BookFormData) => void;
}

const initialBookData: BookFormData = {
  title: '',
  author: '',
  overview: '',
  genre: '',
  publication_date: 0,
  rating: 0,
  places: '',
  free: false,
  img_url: 'https://en.wikipedia.org/wiki/Google_Search#/media/File:Google_Homepage.PNG',
  source_url: 'https://www.google.com/'
};

export default function BookModal({ isOpen, onClose, onSubmit }: BookModalProps) {
  const [newBook, setNewBook] = useState<BookFormData>(initialBookData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newBook);
    setNewBook(initialBookData);
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
          >
            <X size={24} />
          </button>
        </div>

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
              />
            </div>
          </div>

          {/* New fields for img_url and source_url */}
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
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newBook.free}
                onChange={(e) =>
                  setNewBook({ ...newBook, free: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Free to read</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}