import { getAllPurchasesByUserId } from "@/repositories/purchaseRepository";
import { getPurchaseHistoryForApp } from "@/services/purchaseService";

// Mock the data recievd from purchaseRepository
jest.mock("@/repositories/purchaseRepository", () => ({
    getAllPurchasesByUserId: jest.fn()
}))

describe("Unit test: purchaseService", () => {

    it("Should return all purchases with the transform purchase data structure", async () => {

        // Mock data for this specific test
        const mockPurchaseData = [
            {
                purchaseId: 1,
                purchasePrice: 5,
                amount: 1,
                createdAt: "2024-11-21T17:15:12.524Z",
                updatedAt: "2024-11-21T17:15:12.524Z",
                product: { productId: 3, name: 'Fanta Orange', isActive: true }
            },
            {
                purchaseId: 2,
                purchasePrice: 5,
                amount: 1,
                createdAt: "2024-11-21T17:17:12.524Z",
                updatedAt: "2024-11-21T17:17:12.524Z",
                product: { productId: 3, name: 'Fanta Orange', isActive: true }
            },
            {
                purchaseId: 3,
                purchasePrice: 5,
                amount: 3,
                createdAt: "2024-12-21T17:15:12.524Z",
                updatedAt: "2024-12-21T17:15:12.524Z",
                product: { productId: 3, name: 'Fanta Orange', isActive: true }
            },
            {
                purchaseId: 4,
                purchasePrice: 20,
                amount: 2,
                createdAt: "2024-12-22T17:15:12.524Z",
                updatedAt: "2024-12-22T17:15:12.524Z",
                product: { productId: 3, name: 'Fanta Orange', isActive: true }
            },
            {
                purchaseId: 5,
                purchasePrice: 5,
                amount: 1,
                createdAt: "2025-01-21T17:15:12.524Z",
                updatedAt: "2025-01-21T17:15:12.524Z",
                product: { productId: 3, name: 'Fanta Orange', isActive: true }
            },
        ];

        (getAllPurchasesByUserId as jest.Mock).mockResolvedValue(mockPurchaseData);

        const transformedUserPurchases = await getPurchaseHistoryForApp(1);

        expect(transformedUserPurchases).toBeInstanceOf(Array);
        expect(transformedUserPurchases).toHaveLength(3);

        expect(transformedUserPurchases[0].data).toHaveLength(1);
        expect(transformedUserPurchases[0].data[0].receiptItems).toHaveLength(2);
        expect(transformedUserPurchases[0].data[0].totalPrice).toBe(10);
        expect(transformedUserPurchases[0].totalPrice).toBe(10);
        expect(transformedUserPurchases[0].isCollapsed).toBe(false);

        expect(transformedUserPurchases[1].data).toHaveLength(2);
        expect(transformedUserPurchases[1].data[0].receiptItems).toHaveLength(1);
        expect(transformedUserPurchases[1].data[0].totalPrice).toBe(15);
        expect(transformedUserPurchases[1].data[1].receiptItems).toHaveLength(1);
        expect(transformedUserPurchases[1].data[1].totalPrice).toBe(40);
        expect(transformedUserPurchases[1].totalPrice).toBe(55);
        expect(transformedUserPurchases[1].isCollapsed).toBe(false);

        expect(transformedUserPurchases[2].data).toHaveLength(1);
        expect(transformedUserPurchases[2].data[0].receiptItems).toHaveLength(1);
        expect(transformedUserPurchases[2].data[0].totalPrice).toBe(5);
        expect(transformedUserPurchases[2].totalPrice).toBe(5);
        expect(transformedUserPurchases[2].isCollapsed).toBe(false);

        // Ensure mocks were called
        expect(getAllPurchasesByUserId).toHaveBeenCalledWith(1, undefined, undefined);
    })
})