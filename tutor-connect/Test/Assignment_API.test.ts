// Test/Assignment_API.test.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { GET } from '@/app/api/assignments/route';
import { describe, it, expect, jest } from '@jest/globals';
import { levels, subjectsByLevel } from '@/utils/levelsAndSubjects';

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

jest.mock('@/lib/prisma');

describe('GET /api/assignments', () => {
  it('should return all assignments', async () => {
    // Arrange
    const assignments: Assignment[] = [
      {
        id: 1,
        subject: subjectsByLevel['Primary 1'][0],
        level: levels.Primary[0],
        clientId: 1,
        tutorId: 1,
        client: { name: 'Client 1' },
        tutor: { name: 'Tutor 1' },
        additionalDetails: 'Details',
        postDate: new Date(),
        taken: false,
        address: 'Address 1',
        postalCode: 12345,
        minRate: 20,
        maxRate: 50,
        duration: '1 hour',
        frequency: 'Weekly',
        typeOfTutor: ['Certified'],
        gender: 'Any',
        race: ['Any'],
        availability: 'Weekdays',
      },
      {
        id: 2,
        subject: subjectsByLevel['Primary 2'][1],
        level: levels.Primary[1],
        clientId: 2,
        tutorId: 2,
        client: { name: 'Client 2' },
        tutor: { name: 'Tutor 2' },
        additionalDetails: 'Details',
        postDate: new Date(),
        taken: false,
        address: 'Address 2',
        postalCode: 67890,
        minRate: 30,
        maxRate: 60,
        duration: '2 hours',
        frequency: 'Bi-weekly',
        typeOfTutor: ['Experienced'],
        gender: 'Any',
        race: ['Any'],
        availability: 'Weekends',
      },
    ];

    (prisma.assignment.findMany as jest.Mock<() =>Promise<Assignment[]>>).mockResolvedValueOnce(assignments);

    // Act
    const result = await GET({} as Request);

    // Assert
    expect(result).toBeInstanceOf(NextResponse);
    expect(result.status).toBe(200);
    expect(result.headers.get('Content-Type')).toBe('application/json');

    const bodyText = await result.text();
    expect(JSON.parse(bodyText)).toEqual(assignments);
  });

  it('should return error response on error', async () => {
    // Arrange
    const errorMessage = 'Some error message';

    (prisma.assignment.findMany as jest.Mock<() => Promise<Assignment[]>>).mockRejectedValueOnce(new Error(errorMessage));

    // Act
    const result = await GET({} as Request);

    // Assert
    expect(result).toBeInstanceOf(NextResponse);
    expect(result.status).toBe(500);
    expect(result.headers.get('Content-Type')).toBe('application/json');

    const bodyText = await result.text();
    expect(JSON.parse(bodyText).error).toBe(errorMessage);
  });
});

//TODO: Learn Jest for Typescript nextjs