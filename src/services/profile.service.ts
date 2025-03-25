import profileRepository from "../repositories/profileRepository";
import { Profile } from "../entities/Profile";

/**
 * Get a profile by id
 */
export const getProfileById = async (id: string): Promise<Profile | null> => {
  return await profileRepository.findProfileById(id);
};

export default {
  getProfileById,
};
