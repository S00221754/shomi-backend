import pool from "../config/db";

export const findUserByEmail = async (email: string) => {
    const query = "SELECT * FROM users WHERE user_email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

export const createUser = async (name: string, email: string, hashedPassword: string) => {
    const query = `
      INSERT INTO users (user_name, user_email, user_password)
      VALUES ($1, $2, $3)
      RETURNING user_id, user_name, user_email
    `;

    //check if theres a better way of doing this
    const { rows } = await pool.query(query, [name, email, hashedPassword]);

    return rows.length > 0
        ? { success: true, userId: rows[0].user_id }
        : { success: false };
};

export default { findUserByEmail, createUser };