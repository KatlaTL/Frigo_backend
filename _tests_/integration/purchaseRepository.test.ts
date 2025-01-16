import { getAllPurchasesByUserId } from "@/repositories/purchaseRepository";
import { PurchaseHistoryType } from "@/services/purchaseService";
import { Decimal } from "@prisma/client/runtime/library";


// Integration testing is when you test if different modules or component works together as expected
describe("Integration test: purchaseRepository", () => {
    // Ideally use a test database so the tests doesn't effect the production database
    beforeAll(async () => {
        // Migrate and seed the test database
    })

    afterAll(async () => {
        // Clean up the test database
    })


    it("Should return all purchases by a user with the correct data structure", async () => {
        const userPurchases = await getAllPurchasesByUserId(1);

        expect(userPurchases).toBeInstanceOf(Array);

        userPurchases.forEach(user => {
            expect(user).toMatchObject<PurchaseHistoryType>({
                purchaseId: expect.any(Number),
                purchasePrice: expect.any(Decimal),
                amount: expect.any(Number),
                product: expect.objectContaining({
                    productId: expect.any(Number),
                    name: expect.any(String),
                    isActive: expect.any(Boolean)
                }),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            })
        })
    })
})