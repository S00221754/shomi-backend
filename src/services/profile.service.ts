import profileRepository from "../repositories/profileRepository";
import { Profile } from "../entities/Profile";
import createHttpError from "http-errors";

/**
 * Get a profile by id
 */
export const getProfileById = async (id: string): Promise<Profile | null> => {
  return await profileRepository.findProfileById(id);
};

/**
 * Update a profile
 */
export const updateProfile = async (
  id: string,
  updates: Partial<Profile>
): Promise<void> => {
  // Check if the profile exists before updating
  const existingProfile = await profileRepository.findProfileById(id);

  if (!existingProfile) {
    throw new createHttpError.NotFound("Profile not found");
  }

  await profileRepository.updateProfile(id, updates);
};

export default {
  getProfileById,
  updateProfile,
};
