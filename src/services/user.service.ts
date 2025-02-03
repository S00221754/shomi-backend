import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import jwt from "jsonwebtoken";
import userRepository from '../repositories/userRepository';
const saltRounds = 10;


// Create user
const createUser = async (name: string, email: string, password: string) => {
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
        throw new createHttpError.BadRequest("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await userRepository.createUser(name, email, hashedPassword);

    if (!result.success) {
        throw new createHttpError.InternalServerError();
    }

    return result;
};

// Login user
const loginUser = async (email: string, password: string) => {
    const user = await userRepository.findUserByEmail(email);
    
    if (!user) {
        throw new createHttpError.NotFound();
    }
    
    const isMatch = await bcrypt.compare(password, user.user_password);
    
    if (!isMatch) {
        throw new createHttpError.Unauthorized('Invalid credentials');
    }
    
    const token = jwt.sign(
      { id: user.user_id, email: user.user_email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: { id: user.user_id, name: user.user_name, email: user.user_email }
    };
};


export default { createUser, loginUser };