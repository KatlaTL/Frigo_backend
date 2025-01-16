import { GET, POST } from "@/app/api/v1/app/protected/users/[userId]/purchases/route";
import * as purchaseService from "@/services/purchaseService";
import { validateGetPurchasesParams } from "@/utils/validation/validatePurchaseParams";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@/utils/validation/validatePurchaseParams", () => ({
    validateGetPurchasesParams: jest.fn()
}));

jest.mock("@/services/purchaseService", () => ({
    getPurchaseHistoryForApp: jest.fn(),
}));

describe("API route: app/api/v1/app/protected/users/[userId]/purchases", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Should return a 200 reponse and a list of all purchases for a user on a GET request", async () => {
        // Mock the repsonse of validateGetPurchasesParams()
        (validateGetPurchasesParams as jest.Mock).mockResolvedValue({
            parsedUserId: 1,
            parsedLimit: NaN,
            parsedOffset: NaN
        })

        // Mock the data returned by getPurchaseHistoryForApp()
        const mockPurchases = [
            {
                title: "January 2025",
                data: [
                    {
                        receiptTitle: "January 1st",
                        receiptItems: [{ purchaseId: 1, purchasePrice: 100, amount: 1 }],
                        totalPrice: 100,
                    },
                ],
                totalPrice: 100,
                isCollapsed: false,
            },
        ];

        (purchaseService.getPurchaseHistoryForApp as jest.Mock).mockResolvedValue(mockPurchases);


        // Mock the api request
        const url = "http://localhost/api/v1/app/protected/users/1/purchases";
        const request = new NextRequest(url);
        const params = Promise.resolve({ userId: "1" });

        const response = await GET(request, { params });

        expect(response.status).toBe(200);

        const json = await response.json();

        expect(json).toEqual({
            message: "All purchases for the userId: 1",
            statusCode: 200,
            limit: undefined,
            offset: undefined,
            purchases: mockPurchases,
        });

        // Ensure mocks were called
        expect(validateGetPurchasesParams).toHaveBeenCalledWith(request, params);
        expect(purchaseService.getPurchaseHistoryForApp).toHaveBeenCalledWith(1, NaN, NaN);
    })

    it("Should return a status 400 bad response on a GET request if validation fails", async () => {
        // Mock the repsonse of validateGetPurchasesParams()
        (validateGetPurchasesParams as jest.Mock).mockResolvedValue(NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_PARAMS",
                message: "Missing or invalid param userId",
                details: [
                    {
                        validation: "regex",
                        code: "invalid_string",
                        message: "Invalid",
                        path: [
                            "userId"
                        ]
                    }
                ],
                guidance: "Please ensure the 'userId' is provided in the query string as valid integers. If 'limit' or 'offset' is provide, ensure they are valid integers"
            }
        }, { status: 400 }))


        // Mock the api request
        const url = "http://localhost/api/v1/app/protected/users/1/purchases";
        const request = new NextRequest(url);
        const params = Promise.resolve({ userId: "one" });

        const response = await GET(request, { params });

        expect(response.status).toBe(400);

        // Ensure mocks were called
        expect(validateGetPurchasesParams).toHaveBeenCalledWith(request, params);
    })

    it("Should return a 500 server error response on a GET request if an unexpcted error occurs", async () => {
        // Mock the repsonse of validateGetPurchasesParams()
        (validateGetPurchasesParams as jest.Mock).mockResolvedValue({
            parsedUserId: 1,
            parsedLimit: NaN,
            parsedOffset: NaN
        })

        // Mock an unexpected server error
        jest.spyOn(purchaseService, "getPurchaseHistoryForApp").mockImplementation(() => {
            throw new Error("Mocked Error");
        });

        // Mock the api request
        const url = "http://localhost/api/v1/app/protected/users/1/purchases";
        const request = new NextRequest(url);
        const params = Promise.resolve({ userId: "1" });
        
        const response = await GET(request, { params });

        expect(() => purchaseService.getPurchaseHistoryForApp(1)).toThrow("Mocked Error")

        expect(response.status).toBe(500);

        // Ensure mocks were called
        expect(validateGetPurchasesParams).toHaveBeenCalledWith(request, params);
        expect(purchaseService.getPurchaseHistoryForApp).toHaveBeenCalledWith(1, NaN, NaN);
    })
})