import argon2 from 'argon2';

/**
 * Hashes a password using argon2. \
 * argon2 automatically generate an unique salt each time it hashed a password
 * @param password 
 * @returns The hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
}

/**
 * Verifies a password using argon2 by comparing it with a provided hashed password. \
 * argon2 will automatically extract the salt from the hashed password
 * @param password 
 * @param hashedPassword 
 * @returns true if the passwords matches. False otherwise
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await argon2.verify(hashedPassword, password);
}