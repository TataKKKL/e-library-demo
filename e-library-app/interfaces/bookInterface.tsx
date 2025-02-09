export interface Book {
  id: number;           // Added to match API response
  title: string;
  author: string;
  genre: string;
  overview: string;
  rating: number;
  publication_date: number;  // Changed from 'date' to match API
  places: string;
  img_url: string;
  source_url: string;   // Changed from 'url' to match API
  created_at: string;   // Added to match API
  free?: boolean;       // Kept as optional field
}