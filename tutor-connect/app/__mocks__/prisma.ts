// __mocks__/prisma.ts
import { jest } from '@jest/globals';

export interface Assignment {
  id: number;
  subject: string;
  level: string;
  clientId: number;
  tutorId: number;
  client: { name: string };
  tutor: { name: string };
  additionalDetails: string;
  postDate: Date;
  taken: boolean;
  address: string;
  postalCode: number;
  minRate: number;
  maxRate: number;
  duration: string;
  frequency: string;
  typeOfTutor: string[];
  gender: string;
  race: string[];
  availability: string;
}

const prisma = {
  assignment: {
    findMany: jest.fn<() => Promise<Assignment[]>>(),  // Correctly type as a function returning a promise of Assignment[]
  },
};

export { prisma };


