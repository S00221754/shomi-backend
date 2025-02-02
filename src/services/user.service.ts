import pool from '../config/db';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `
      INSERT INTO users (user_name, user_email, user_password)
      VALUES ($1, $2, $3)
      RETURNING user_id, user_name, user_email
    `;
    
    const { rows } = await pool.query(query, [name, email, hashedPassword]);
    return rows[0];
};

const findUserByEmail = async (email: string) => {
    const query = 'SELECT * FROM users WHERE user_email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

export default { createUser, findUserByEmail };