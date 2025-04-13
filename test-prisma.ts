import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to DB successfully!');
  } catch (err) {
    console.error('Failed to connect:', err);
  }
}

main();
