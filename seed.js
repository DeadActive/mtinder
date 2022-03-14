const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            username: 'test',
            password: 'passwd',
        },
    });
}

main()
    .catch()
    .finally(async () => await prisma.$disconnect());
