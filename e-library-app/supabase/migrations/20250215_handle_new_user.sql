CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER SECURITY DEFINER SET search_path = public 
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO public.profiles (id, email, user_role)
    VALUES (NEW.id, NEW.email, 'user');
    RETURN NEW;
END;
$$;