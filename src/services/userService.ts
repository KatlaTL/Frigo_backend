import { getActiveAndVerifiedUserByEmail } from "@/repositories/userRepository"

type UserAppType = {
    userId: number;
    hashedPassword: string;
    email: string;
    currentTokenIdentifier: string;
}

/**
 * Get an active and verified user based on an email.
 * @param email - The users email
 * @returns Returns an object with the userId, currentTokenIdentifier and hashedPassword. Returns null if the user doesn't exist
 */
export const getActiveAndVerifiedUserForApp = async (email: string): Promise<UserAppType | null> => {
    if (!email) {
        throw new Error("Email missing");
    }

    try {
        const user = await getActiveAndVerifiedUserByEmail(email);
        
        if (!user) {
            return null;
        }

        return {
            userId: user.userId,
            hashedPassword: user.password,
            email: user.email,
            currentTokenIdentifier: user.currentTokenIdentifier
        };
    } catch (error) {
        throw error;
    }
}