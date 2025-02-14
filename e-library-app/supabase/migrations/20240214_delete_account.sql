-- First delete from profiles
DELETE FROM profiles WHERE id = '92e2fa7b-201e-4140-8f8d-95882cd974df';
-- Then delete from auth.users
DELETE FROM auth.users WHERE id = '92e2fa7b-201e-4140-8f8d-95882cd974df';