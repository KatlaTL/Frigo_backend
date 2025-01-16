import { GET, POST } from "@/app/api/v1/app/protected/users/[userId]/purchases/route";
import { validateGetPurchasesParams } from "@/utils/validation/validatePurchaseParams";
import { NextRequest } from "next/server";

jest.mock("@/utils/validation", () => ({
    validateGetPurchasesParams: jest.fn()
}));

describe("API route: app/api/v1/app/protected/users/[userId]/purchases", () => {

    it("Should return a list of all purchases for a user on a GET request", async () => {
        (validateGetPurchasesParams as jest.Mock).mockResolvedValue({
            parsedUserId: 1,
            parsedLimit: NaN,
            parsedOffset: NaN
        })


        // Mock the api request
        const url = "http://localhost/app/api/v1/protected/users/1/purchases";
        const request = new NextRequest(url);
        const params = Promise.resolve({ userId: "1" });

        const response = await GET(request, { params });

        expect(response.status).toBe(200);
    })
})