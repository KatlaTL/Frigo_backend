import { getActiveAndVerifiedUserByEmail } from "@/repositories/userRepository"

// Contains business logic, transformations, and any additional operations based on application needs
// By having the service depend on the repository, business logic is encapsulated and centralized, keeping it separate from the raw data fetching layer. 

/* --- TODO ---
Implement functionality and UI for purchases when it comes to the admin panel, 
the code below is only used by the app for now. */

//----------------------------------- For the app ----------------------------------------

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


    return users;
}

export const getSpecificUser = async () => {
    
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