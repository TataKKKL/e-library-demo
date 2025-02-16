// components/BookLikeButtons.tsx
import React, { useState, useEffect } from 'react';
import { Heart, HeartOff } from 'lucide-react';

interface BookLikeButtonsProps {
  bookId: number;
}

const BookLikeButtons: React.FC<BookLikeButtonsProps> = ({ bookId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkLikeStatus();
  }, [bookId]);

  const checkLikeStatus = async () => {
    setError('');
    try {
      const response = await fetch(`/api/book-likes/${bookId}/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        setError('Please log in to interact with likes');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to check like status');
      }
      
      const data = await response.json();
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error('Error checking like status:', error);
      setError('Error checking like status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(`/api/book-likes/${bookId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        setError('Please log in to like books');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to like book');
      }

      setIsLiked(true);
    } catch (error) {
      console.error('Error liking book:', error);
      setError('Error liking book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlike = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(`/api/book-likes/${bookId}/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        setError('Please log in to unlike books');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to unlike book');
      }

      setIsLiked(false);
    } catch (error) {
      console.error('Error unliking book:', error);
      setError('Error unliking book');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-24 h-10 border rounded-md bg-gray-50">
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">{error}</div>
    );
  }

  return (
    <div className="flex gap-2">
      {!isLiked ? (
        <button
          onClick={handleLike}
          disabled={isLoading}
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 
                   text-red-600 font-semibold py-2 px-4 border border-red-200 
                   rounded transition-colors duration-200 disabled:opacity-50"
        >
          <Heart className="w-5 h-5" />
          Like
        </button>
      ) : (
        <button
          onClick={handleUnlike}
          disabled={isLoading}
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 
                   text-gray-600 font-semibold py-2 px-4 border border-gray-200 
                   rounded transition-colors duration-200 disabled:opacity-50"
        >
          <HeartOff className="w-5 h-5" />
          Unlike
        </button>
      )}
    </div>
  );
};

export default BookLikeButtons;