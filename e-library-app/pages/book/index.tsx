import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Book as BookIcon } from 'lucide-react';
import Link from 'next/link';
import data from '../../data/books.json';

export default function Books() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Book Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((book, index) => (
          <Link href={`/book/${encodeURIComponent(book.title)}`} key={index}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/placeholder/300/400';
                  }}
                />
                <CardTitle className="flex items-start justify-between mt-4">
                  <span className="text-xl font-semibold">{book.title}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>{book.rating || 'N/A'}</span>
                  </div>
                </CardTitle>
                <div className="text-sm text-gray-500">
                  by {book.author}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookIcon className="w-4 h-4" />
                    <span className="text-sm">{book.genre}</span>
                  </div>
                  <p className="text-sm text-gray-600">{book.overview}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Published: {book.date}</span>
                    <span>Location: {book.places}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}