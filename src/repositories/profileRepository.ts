import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { Profile } from "../entities/Profile";

const profileRepo: Repository<Profile> = AppDataSource.getRepository(Profile);

export const findProfileById = async (id: string): Promise<Profile | null> => {
  return await profileRepo.findOne({ where: { id } });
};

export const updateProfile = async (id: string, updates: Partial<Profile>): Promise<void> => {
  await profileRepo.update({ id }, updates);
};


export default {
  findProfileById,
  updateProfile
};
