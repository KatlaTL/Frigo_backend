import { prisma } from '@/lib/prisma';

// Handles direct communication with the database
// The repository only returns data without any transformation or extra logic

/* --- TODO ---
Implement functionality and UI for users (this includes authentication) when it comes to the admin panel, 
the code below is only used by the app for now. */

type UserType = {
    name: string;
    password: string;
    email: string;
    currentTokenIdentifier: string;
    statusId: number;
}

/**
 * Add user to the user table and relate it to the user role
 */
export const addUser = async (userData: UserType) => {
    return prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            currentTokenIdentifier: userData.currentTokenIdentifier,
            isVerified: true,
            status: {
                connect: {
                    statusId: userData.statusId
                }
            },
            role: {
                connect: {
                    title: "user",
                    roleId: 3,
                    priority: 3
                },
            }
        }
    });
}

/**
 * Set the currentTokenIdentifier on a user
 * @param userId - The user's ID
 * @param email - The user's email
 * @param jti - The current token identifier
 * @returns The updated user
 */
export const setUserCurrentTokenIdentifier = async (userId: number, email: string, jti: string) => {
    return prisma.user.update({
        data: {
            currentTokenIdentifier: jti
        },
        where: {
            userId,
            email
        }
    })
}

/**
 * Get the currentTokenIdentifier for a usr
 * @param userId - The user's ID
 * @param email - The user's email
 * @returns An object with the currentTokenIdentifier
 */
export const getUserCurrentTokenIdentifier = async (userId: number, email: string) => {
    return prisma.user.findFirst({
        select: {
            currentTokenIdentifier: true
        },
        where: {
            userId,
            email
        }
    })
}


/**
 * Find an active and verified user by email
 * @param email - valid email
 * @returns The active user
 */
export const getActiveAndVerifiedUserByEmail = async (email: string) => {
    return prisma.user.findFirst({
        select: {
            userId: true,
            name: true,
            email: true,
            isVerified: true,
            role: true,
            department: true,
            password: true,
            currentTokenIdentifier: true,
            createdAt: true,
            updatedAt: true
        },
        where: {
            email,
            isActive: true,
            isVerified: true
        }
    })
}