import { getUserCurrentTokenIdentifier, setUserCurrentTokenIdentifier } from '@/repositories/userRepository';
import { UnauthorizedError } from '@/utils/error/UnauthorizedError';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { JOSEError } from 'jose/errors';
import { v4 as uuidv4 } from "uuid";

type UserJTI = {
    userId: number;
    email: string;
    jti: string;
}

interface UserJWTPayload extends Omit<JWTPayload, "jti">, UserJTI { }

export type TokenUserType = {
    userId: number;
    email: string;
}

export enum TokenType {
    ACCESS_TOKEN_SECRET = "ACCESS_TOKEN_SECRET",
    REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET"
}

const TOKEN_ISSUER = process.env.TOKEN_ISSUER ?? "";
const TOKEN_AUDIENCE = process.env.TOKEN_AUDIENCE ?? "";

/**
 * Verify a JWT token \
 * Throws an UnauthorizedError if validation fails
 * @param token - Token to verify
 * @param type - Import TokenType for available types
 * @returns UserJWTPayload
 */
export const verifyToken = async (token: string, type: TokenType) => {
    try {
        const jwtSecret = new TextEncoder().encode(getSecret(type));

        const { payload }: { payload: UserJWTPayload } = await jwtVerify(token, jwtSecret, {
            issuer: TOKEN_ISSUER,
            audience: TOKEN_AUDIENCE
        });

        const { jti } = payload;

        if (!jti) {
            throw new UnauthorizedError("Token is missing the JWT ID (jti) claim");
        }

        return payload;

    } catch (error) {
        if (error instanceof UnauthorizedError) {
            throw new UnauthorizedError(error.message, "invalid_token");
        } else if (error instanceof JOSEError) {
            throw new UnauthorizedError("JWT verification failed", "token_verification_failed");
        }

        throw new UnauthorizedError("Invalid token", "invalid_token");
    }
}


/**
 * Generate a new JWT token. \
 * Based on the secrects found in your .env 
 * @param user - Object with userId and email
 * @param type - Import TokenType for available types
 * @param expiresIn - number | string | Date - Format used for time span should be a number followed by a unit, such as "5 minutes" or "1 day".
 * @returns 
 */
export const generateToken = async (user: TokenUserType, type: TokenType, expiresIn: string) => {
    const jwtSecret = new TextEncoder().encode(getSecret(type));

    const jti = uuidv4(); // use UUID library to generate an unique jti

    const token = await new SignJWT(user)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer(TOKEN_ISSUER)
        .setAudience(TOKEN_AUDIENCE)
        .setJti(jti)
        .setExpirationTime(expiresIn)
        .sign(jwtSecret);

    return {
        token,
        jti
    }
};

/**
 * Validate the jti. \
 * Compares it with the jti stored on in the user table
 * @param UserJWTPayload 
 * @returns true if it's valid, false otherwise
 */
export const validateJti = async (UserJWTPayload: UserJWTPayload): Promise<boolean> => {
    try {
        const { userId, email, jti } = UserJWTPayload;

        const user = await getUserCurrentTokenIdentifier(userId, email);

        if (!user) {
            throw new UnauthorizedError("User doesn't exist");
        }

        if (jti !== user.currentTokenIdentifier) {
            throw new UnauthorizedError("Token is not valid or has been revoked");
        }

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Generates a new access and refresh token
 * @param userId 
 * @param email 
 * @returns Object with an access and refresh token
 */
export const generateNewTokens = async (userId: number, email: string) => {
    try {
        const userToken: TokenUserType = {
            userId,
            email
        }

        // Generate new access and refresh tokens
        const accessToken = await generateToken(userToken, TokenType.ACCESS_TOKEN_SECRET, "5m"); // Expires in 5 minutes
        const refreshToken = await generateToken(userToken, TokenType.REFRESH_TOKEN_SECRET, "7d"); // Expires in 7 days

        await setUserCurrentTokenIdentifier(userId, email, refreshToken.jti);

        return {
            accessToken: accessToken.token,
            refreshToken: refreshToken.token
        }
    } catch (error) {
        return null;
    }
}

/**
 * Get the secret stored in .env for JWT
 * @param type 
 * @returns 
 */
const getSecret = (type: TokenType): string => {
    switch (type) {
        case TokenType.ACCESS_TOKEN_SECRET:
            return process.env.ACCESS_TOKEN_SECRET ?? "";
        case TokenType.REFRESH_TOKEN_SECRET:
            return process.env.REFRESH_TOKEN_SECRET ?? "";
    }
}