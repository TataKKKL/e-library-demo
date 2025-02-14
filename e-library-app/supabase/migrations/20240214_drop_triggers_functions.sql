-- First drop existing triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_email_updated ON auth.users;
DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS handle_email_update();
DROP FUNCTION IF EXISTS set_updated_at();
DROP TABLE IF EXISTS profiles;