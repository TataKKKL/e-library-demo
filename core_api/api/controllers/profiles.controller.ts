// controllers/profiles.controller.ts
import { Request, Response } from 'express';
import { fetchAllProfiles } from '../services/profiles.service';

export const getAllProfilesController = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const profiles = await fetchAllProfiles();
    return res.status(200).json(profiles);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};