// services/profiles.service.ts
import { getAllProfiles } from '../db/profiles';

export const fetchAllProfiles = async () => {
  return await getAllProfiles();
};