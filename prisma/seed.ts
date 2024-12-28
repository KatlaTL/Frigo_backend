import { hashPassword } from "../src/lib/auth/hash";
import { PrismaClient } from "@prisma/client";
import fs from 'fs';

const prisma = new PrismaClient();

const main = async () => {
    console.log('Seeding the database...');

    const role = await prisma.role.upsert({
        create: {
            title: "superAdmin",
            priority: 1,
        },
        update: {},
        where: { roleId: 1 }
    });

    await prisma.role.upsert({
        create: {
            title: "companyAdmin",
            priority: 2,
        },
        update: {},
        where: { roleId: 2 }
    });

    await prisma.role.upsert({
        create: {
            title: "user",
            priority: 3,
        },
        update: {},
        where: { roleId: 3 }
    });

    const status = await prisma.status.upsert({
        create: {
            status: "active"
        },
        update: {},
        where: { statusId: 1 }
    });

    await prisma.status.upsert({
        create: {
            status: "inActive"
        },
        update: {},
        where: { statusId: 2 }
    });

    await prisma.status.upsert({
        create: {
            status: "pending"
        },
        update: {},
        where: { statusId: 3 }
    });

    const company = await prisma.company.upsert({
        create: {
            name: "Pentia",
        },
        update: {},
        where: { companyId: 1 }
    })

    const department = await prisma.department.upsert({
        create: {
            name: "Odense",
            companyId: company.companyId,
        },
        update: {},
        where: { departmentId: 1 }
    })

    await prisma.user.upsert({
        create: {
            name: "superAdmin",
            email: "admin@pentia.dk",
            password: await hashPassword("admin123"),
            currentTokenIdentifier: "",
            roleId: role.roleId,
            statusId: status.statusId,
            departmentId: department.departmentId,
            isVerified: true
        },
        update: {},
        where: { userId: 1 }
    })

    await prisma.category.upsert({
        create: {
            title: "Sodavand",
        },
        update: {},
        where: { categoryId: 1 }
    })

    await prisma.category.upsert({
        create: {
            title: "Clutch",
        },
        update: {},
        where: { categoryId: 2 }
    })

    await prisma.category.upsert({
        create: {
            title: "Vitamin Well",
        },
        update: {},
        where: { categoryId: 3 }
    })

    await prisma.category.upsert({
        create: {
            title: "Protein bar",
        },
        update: {},
        where: { categoryId: 4 }
    })

    await prisma.category.upsert({
        create: {
            title: "Øvrige",
        },
        update: {},
        where: { categoryId: 5 }
    })

    const productsData = JSON.parse(fs.readFileSync('./seed-products.json', 'utf-8'));

    for (const product of productsData) {
        await prisma.product.upsert({
            where: { productId: product.productId }, // Use a unique identifier
            update: {}, // Prevent duplicates
            create: {
                name: product.name,
                price: product.price,
                image: product.image,
                isActive: product.isActive,
                categoryId: product.categoryId,
                statusId: product.statusId,
                createdAt: new Date(product.createdAt),
                updatedAt: new Date(product.updatedAt),
            },
        });
    }

    console.log('Database seeded successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })