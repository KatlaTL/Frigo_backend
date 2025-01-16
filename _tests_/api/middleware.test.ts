import { generateToken, TokenType } from "@/lib/auth/tokens";
import { middleware } from "@/middleware";
import { NextRequest } from "next/server";


describe("Middleware", () => {
    it("Should allow the request if the token is valid", async () => {
        // Generate an access token
        const accessToken = await generateToken({
            userId: 1,
            email: "mock@mock.dk"
        }, TokenType.ACCESS_TOKEN, "5m");

        // Mock an API request
        const url = "http://localhost/api/v1/app/protected/users/1";
        const request = new NextRequest(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${accessToken.token}`,
            },
        });

        const reponse = await middleware(request);

        // Check if NextResponse.next() was called correctly
        expect(reponse.status).toBe(200);
    })

    it("Should return a 401 unauthorized if the token is invalid", async () => {
        // Mock an API request
        const url = "http://localhost/api/v1/app/protected/users/1";
        const request = new NextRequest(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer mockToken`,
            },
        });

        const reponse = await middleware(request);

        expect(reponse.status).toBe(401);
    })
})