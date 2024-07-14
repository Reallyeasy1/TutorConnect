// src/lib/prismaMock.ts
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const prismaMock = mockDeep<PrismaClient>();

export const resetPrismaMock = () => {
  mockReset(prismaMock);
};

export { prismaMock };
export default prisma;
