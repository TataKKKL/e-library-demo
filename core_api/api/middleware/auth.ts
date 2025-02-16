// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { supabase, supabaseAdmin } from '../lib/supabase';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
      };
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the JWT token using Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Add the user info to the request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Middleware to authenticate admin users by checking the profiles table
export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token using the admin client
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) {
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Query the "profiles" table to check the user's role
    const { data: profile, error: dbError } = await supabaseAdmin
      .from('profiles')
      .select('user_role')
      .eq('id', user.id)
      .single();

    if (dbError) {
      console.error('Error fetching user profile:', dbError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    if (!profile || profile.user_role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient privileges' });
    }

    // Attach user info to the request
    req.user = {
      id: user.id,
      email: user.email,
      role: profile.user_role,
    };

    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};
