import { prismaMock, resetPrismaMock } from "@/lib/prismaMock";
import { POST as postAssignment } from "@/app/api/client/postAssignments/route"; // Import your assignment route
import Decimal from "decimal.js";

describe('Assignment API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetPrismaMock();
  });

  it('should create an assignment', async () => {
    const clientId = 50;
    const req = {
      json: jest.fn().mockResolvedValue({
        clientId: clientId.toString(),
        level: 'Primary',
        subject: 'Math',
        address: '123 Test St',
        postalCode: '123456',
        minRate: '20',  // Mock data as string
        maxRate: '50',  // Mock data as string
        duration: '1 hour',
        frequency: 'Weekly',
        additionalDetails: 'None',
        typeOfTutor: ['Private Tutor'], // Updated to array format
        gender: 'Any',
        race: ['Any'], // Updated to array format
        availability: 'Weekends',
        postDate: '2024-07-01T00:00:00Z',
        location: '1.3521, 103.8198', // Coordinates as string
      }),
    };

    const client = {
      id: clientId,
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'Test Client',
      contactNumber: 12345678,
      address: '123 Test St',
      postalCode: 123456,
      active: true,
      image: null,
    };

    const assignment = {
      id: Date.now(),
      clientId: clientId,
      level: 'Primary',
      subject: 'Math',
      address: '123 Test St',
      postalCode: 123456,
      minRate: 20,
      maxRate: 50,
      duration: '1 hour',
      frequency: 'Weekly',
      additionalDetails: 'None',
      typeOfTutor: ['Private Tutor'],  // Array format
      gender: 'Any',
      race: ['Any'],  // Array format
      availability: 'Weekends',
      postDate: new Date('2024-07-01T00:00:00Z'),
      taken: false,
      tutorId: null,
      coordinates: [new Decimal(1.3521), new Decimal(103.8198)],
    };

    prismaMock.client.findUnique.mockResolvedValue(client);
    prismaMock.assignment.create.mockResolvedValue(assignment);

    const response = await postAssignment(req as any);

    console.log('Mock calls:', {
      clientFindUniqueCalls: prismaMock.client.findUnique.mock.calls,
      assignmentCreateCalls: prismaMock.assignment.create.mock.calls,
    });

    expect(response.status).toBe(201);
    const jsonResponse = await response.json();
    // Adjust expected response to match expected format
    let expectedAssignment = { ...assignment};
    expectedAssignment.id = jsonResponse.assignment.id;
    console.log("expectedAssignment:", expectedAssignment)
    let jsonAssignment = jsonResponse.assignment;
    jsonAssignment.postDate = new Date(jsonAssignment.postDate);
    jsonAssignment.coordinates = expectedAssignment.coordinates;
    expect(jsonAssignment).toEqual(expectedAssignment);
  });

  it('should return error for invalid minRate and maxRate', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        clientId: '1',
        level: 'Primary',
        subject: 'Math',
        address: '123 Test St',
        postalCode: '123456',
        minRate: '60', // minRate greater than maxRate
        maxRate: '50',
        duration: '1 hour',
        frequency: 'Weekly',
        additionalDetails: 'None',
        typeOfTutor: ['Private Tutor'], // Updated to array format
        gender: 'Any',
        race: ['Any'], // Updated to array format
        availability: 'Weekends',
        postDate: '2024-07-01T00:00:00Z',
      }),
    };

    const response = await postAssignment(req as any);

    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ error: 'Invalid minRate or maxRate' });
  });

  it('should return error for missing required fields', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        clientId: '50',
        level: 'Primary',
        subject: 'Math',
        address: '123 Test St',
        postalCode: '123456',
        duration: '1 hour',
        frequency: 'Weekly',
        additionalDetails: 'None',
        typeOfTutor: ['Private Tutor'], // Updated to array format
        gender: 'Any',
        race: ['Any'], // Updated to array format
        availability: 'Weekends',
        postDate: '2024-07-01T00:00:00Z',
      }),
    };

    const response = await postAssignment(req as any);

    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ error: 'Missing required fields' });
  });

  it('should return error for non-existent client', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        clientId: '999', // Non-existent client ID
        level: 'Primary',
        subject: 'Math',
        address: '123 Test St',
        postalCode: '123456',
        minRate: '20',
        maxRate: '50',
        duration: '1 hour',
        frequency: 'Weekly',
        additionalDetails: 'None',
        typeOfTutor: ['Private Tutor'], // Updated to array format
        gender: 'Any',
        race: ['Any'], // Updated to array format
        availability: 'Weekends',
        postDate: '2024-07-01T00:00:00Z',
      }),
    };

    prismaMock.client.findUnique.mockResolvedValue(null);

    const response = await postAssignment(req as any);

    expect(response.status).toBe(404);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ error: 'Client not found' });
  });
});