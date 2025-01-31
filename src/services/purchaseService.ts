import { getAllPurchasesByUserId } from "@/repositories/purchaseRepository";
import { Decimal } from "@prisma/client/runtime/library";

export type PurchaseHistoryType = {
    purchaseId: number,
    purchasePrice: Decimal | Number,
    amount: number,
    product: {
        productId: number,
        name: string,
        isActive: boolean
    },
    createdAt: Date,
    updatedAt: Date
}

export type PurchaseHistoryReceiptType = {
    receiptTitle: string;
    receiptItems: PurchaseHistoryType[];
    totalPrice: number;
}

export type PurchaseHistoryGrouppedByDateType = {
    title: string;
    data: PurchaseHistoryReceiptType[];
    isCollapsed: boolean;
    totalPrice: number;
}

/**
 * Get the purchase data for a user
 * Sorts the purchase data into a new dataset so it can be used in a React Native SectionList. \
 * Groups all purchases by month, e.g. all purchases in september will be groupped together in one section. \
 * Subgroups all purchases for the same day as a receipt under each corresponding section. \
 * @param userId - The users ID
 * @returns The new dataset which can be used in a React Native SectionList
 */
export const getPurchaseHistoryForApp = async (userId: number, offset?: number | null, limit?: number | null): Promise<PurchaseHistoryGrouppedByDateType[]> => {
    if (!userId || isNaN(userId)) {
        throw new Error("Invalid userId");
    }

    try {
        const purchaseHistoryData: PurchaseHistoryType[] = await getAllPurchasesByUserId(userId, offset, limit);

        if (!purchaseHistoryData || purchaseHistoryData.length === 0) {
            return [];
        }

        return purchaseHistoryData.reduce<PurchaseHistoryGrouppedByDateType[]>((accumulator, currentValue: PurchaseHistoryType) => {
            const currentMonth = new Date(currentValue.createdAt).toLocaleDateString("dk", {
                month: "long",
                year: "numeric"
            });

            // Find the current section by month
            let currentSection: PurchaseHistoryGrouppedByDateType | undefined = accumulator.find(section => section.title === currentMonth);

            if (!currentSection) {
                currentSection = {
                    title: currentMonth,
                    data: [],
                    isCollapsed: false,
                    totalPrice: 0
                } as PurchaseHistoryGrouppedByDateType;

                accumulator.push(currentSection);
            }

            const currentReceiptTitle = new Date(currentValue.createdAt).toLocaleDateString("dk", {
                day: "2-digit",
                month: "long"
            });

            // Find the receipt title group within the current section
            let currentReceiptGroup: PurchaseHistoryReceiptType | undefined = currentSection.data.find(receiptGroup => receiptGroup.receiptTitle === currentReceiptTitle);

            if (!currentReceiptGroup) {
                currentReceiptGroup = {
                    receiptTitle: currentReceiptTitle,
                    receiptItems: [],
                    totalPrice: 0
                } as PurchaseHistoryReceiptType;

                currentSection.data.push(currentReceiptGroup);
            }

            // Add the current item to the receipt group
            currentReceiptGroup.receiptItems.push({
                ...currentValue,
                purchasePrice: Number(currentValue.purchasePrice)
            });

            // Calculate total price for the current receipt group and the whole section
            const itemTotalPrice = Number(currentValue.purchasePrice) * currentValue.amount;
            currentReceiptGroup.totalPrice += itemTotalPrice;
            currentSection.totalPrice += itemTotalPrice;

            return accumulator;
        }, []);

    } catch (error) {
        throw error;
    }
}