-- Add user_role to profiles table
ALTER TABLE public.profiles 
ADD COLUMN user_role TEXT NOT NULL DEFAULT 'user';

-- Set specific user as admin
UPDATE public.profiles 
SET user_role = 'admin'
WHERE id IN (
    SELECT id 
    FROM auth.users 
    WHERE email = 'danqing.zhang.personal@gmail.com'
);

-- Verify the changes (optional)
SELECT p.id, u.email, p.user_role
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
ORDER BY u.email;