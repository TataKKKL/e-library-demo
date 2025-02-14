CREATE TABLE book_likes (
   profile_id UUID NOT NULL REFERENCES profiles(id),
   book_id INTEGER NOT NULL REFERENCES books(id),
   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
   PRIMARY KEY (profile_id, book_id)
);