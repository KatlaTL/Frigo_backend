export class UnauthorizedError extends Error {
    public code: string | null = null;

    constructor (message: string, code: string | null = null) {
        super(message);
        this.name = "UnauthorizedError";
        this.code = code;
    }
}