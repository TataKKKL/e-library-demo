// components/BooksLayout.tsx

'use client';

import React, { useState } from 'react';
import type { Book } from '@/interfaces/bookInterface'; // Or wherever your Book interface is

interface BooksLayoutProps {
  initialBooks: Book[];
}

/**
 * Minimal client component to display a list of Books
 * and show details for the selected book.
 */
export default function BooksLayout({ initialBooks }: BooksLayoutProps) {
  const [books] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(
    books.length ? books[0] : null
  );

  // Basic fallback image logic (inline instead of using a toast hook)
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = '/placeholder-book.jpg'; 
    console.error('Failed to load image; using placeholder instead.');
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Left column: Book list */}
      <div style={{ width: '300px', borderRight: '1px solid #ccc' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <h2>Library</h2>
          <p>{books.length} books</p>
        </div>

        <div style={{ maxHeight: 'calc(100vh - 10rem)', overflowY: 'auto' }}>
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
                background:
                  book.id === selectedBook?.id ? '#f0f8ff' : 'transparent',
              }}
            >
              <h3 style={{ margin: 0 }}>{book.title}</h3>
              <small>{book.author}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Right column: Book details */}
      <div style={{ flex: 1, background: '#fafafa', padding: '1rem' }}>
        {selectedBook ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Book cover */}
            <div
              style={{
                width: '128px',
                height: '192px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={selectedBook.img_url}
                alt={selectedBook.title}
                onError={handleImageError}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Book info */}
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>{selectedBook.title}</h2>
              <p style={{ margin: '0.5rem 0' }}>{selectedBook.author}</p>
              {selectedBook.free && <strong>Free!</strong>}

              {/* Rating */}
              {selectedBook.rating > 0 && (
                <p>
                  Rating: <strong>{selectedBook.rating}</strong>
                </p>
              )}

              {/* Publication date, places, etc. */}
              <p>
                <small>
                  Published: {selectedBook.publication_date}  
                  {!!selectedBook.places && selectedBook.places !== 'N/A' && (
                    <> • Places: {selectedBook.places}</>
                  )}
                </small>
              </p>

              {/* Overview */}
              <div style={{ marginTop: '1rem' }}>
                <h3>Overview</h3>
                <p>{selectedBook.overview}</p>
              </div>

              {/* Genre */}
              {selectedBook.genre && (
                <div style={{ marginTop: '1rem' }}>
                  <h3>Genre</h3>
                  <p>{selectedBook.genre}</p>
                </div>
              )}

              {/* External link */}
              {selectedBook.source_url && (
                <p style={{ marginTop: '1rem' }}>
                  <a
                    href={selectedBook.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source
                  </a>
                </p>
              )}

              {/* Created_at */}
              <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#999' }}>
                Added on {new Date(selectedBook.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#777' }}>
            Select a book to view details
          </div>
        )}
      </div>
    </div>
  );
}
