import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const testuser = await prisma.user.upsert({
    where: { email: 'testuser@test.io' },
    update: {},
    create: {
      email: 'testuser@test.io',
    },
  });

  const testcompany = await prisma.company.upsert({
    where: { name: 'Company AB' },
    update: {},
    create: {
      name: 'Company AB',
      ownerId: testuser.id,
    },
  });

  const testcard1 = await prisma.card.upsert({
    where: { cardNumber: '1111 **** **** ****' },
    update: {},
    create: {
      cardNumber: '1111 **** **** ****',
      companyId: testcompany.id,
      expiryDate: new Date('2028-01-01'),
      spendLimit: 10000,
    },
  });

  const testcard2 = await prisma.card.upsert({
    where: { cardNumber: '2222 **** **** ****' },
    update: {},
    create: {
      cardNumber: '2222 **** **** ****',
      companyId: testcompany.id,
      expiryDate: new Date('2030-01-01'),
      spendLimit: 20000,
    },
  });

  const testtranstaction1 = await prisma.transaction.upsert({
    where: { id: 1 },
    update: {},
    create: {
      cardId: testcard1.id,
      amount: 400,
    },
  });

  const testtranstaction2 = await prisma.transaction.upsert({
    where: { id: 2 },
    update: {},
    create: {
      cardId: testcard1.id,
      amount: 600,
    },
  });

  const testtranstaction3 = await prisma.transaction.upsert({
    where: { id: 3 },
    update: {},
    create: {
      cardId: testcard1.id,
      amount: 750,
    },
  });

  const testtranstaction4 = await prisma.transaction.upsert({
    where: { id: 4 },
    update: {},
    create: {
      cardId: testcard1.id,
      amount: 900,
    },
  });

  const testtranstaction5 = await prisma.transaction.upsert({
    where: { id: 5 },
    update: {},
    create: {
      cardId: testcard2.id,
      amount: 100,
    },
  });

  const testtranstaction6 = await prisma.transaction.upsert({
    where: { id: 6 },
    update: {},
    create: {
      cardId: testcard2.id,
      amount: 400,
    },
  });

  const testtranstaction7 = await prisma.transaction.upsert({
    where: { id: 7 },
    update: {},
    create: {
      cardId: testcard2.id,
      amount: 4000,
    },
  });

  const testinvoice = await prisma.invoice.upsert({
    where: { id: 1 },
    update: {},
    create: {
      cardId: testcard1.id,
      dueDate: new Date('2025-05-05'),
      amountDue: 5000,
    },
  });

  console.log({
    testuser,
    testcompany,
    testcard1,
    testcard2,
    testtranstaction1,
    testtranstaction2,
    testtranstaction3,
    testtranstaction4,
    testtranstaction5,
    testtranstaction6,
    testtranstaction7,
    testinvoice,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
