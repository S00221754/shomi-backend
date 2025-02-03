import { User } from "../entities/User";
import AppDataSource from "../database/data-source";
import { Repository } from "typeorm";

const userRepo: Repository<User> = AppDataSource.getRepository(User);


export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    return await userRepo.findOne({ where: { user_email: email } });
};

export const createUser = async (name: string, email: string, hashedPassword: string) => {
    const newUser = userRepo.create({ user_name: name, user_email: email, user_password: hashedPassword });
    return await userRepo.save(newUser);
};

export default { findUserByEmail, createUser };