import { prismaMock, resetPrismaMock } from "@/lib/prismaMock";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { POST } from "@/app/api/client/register/route";
import { POST as getClientDetails } from "@/app/api/client/getClientDetails/route"; // Renamed import alias for clarity
import { prisma } from "@/lib/prisma";

jest.mock('@/lib/mailService');
jest.mock('bcrypt');
jest.mock('crypto');

describe('Client API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetPrismaMock();
  });

  it('should create a client', async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;
    const uniqueToken = `uniqueToken${Date.now()}`;
    const req = {
      json: jest.fn().mockResolvedValue({
        email: uniqueEmail,
        password: 'password123',
        name: 'Test User',
        contactNumber: '12345678',  // Mock data as string
        address: '123 Test St',
        postalCode: '123456',  // Mock data as string
      }),
    };

    const user = {
      id: Date.now(), // Using Date.now() for unique user ID
      email: uniqueEmail,
      password: 'hashedpassword',
      name: 'Test User',
      contactNumber: 12345678,  // Ensure this is an integer
      address: '123 Test St',
      postalCode: 123456,  // Ensure this is an integer
      active: false,
      image: null,
    };

    const token = {
      id: Date.now() + 1, // Ensuring a unique token ID
      clientId: user.id,
      token: `${uniqueToken}${uniqueToken}`.replace(/-/g, ""),
      createdAt: new Date(),
      activatedAt: null,
    };

    (hash as jest.Mock).mockResolvedValue('hashedpassword');
    (randomUUID as jest.Mock).mockReturnValueOnce(uniqueToken).mockReturnValueOnce(uniqueToken);
    prismaMock.client.create.mockResolvedValue(user);
    prismaMock.activateClientToken.create.mockResolvedValue(token);

    const response = await POST(req as any);

    console.log('Mock calls:', {
      hashCalls: (hash as jest.Mock).mock.calls,
      clientCreateCalls: prismaMock.client.create.mock.calls,
      tokenCreateCalls: prismaMock.activateClientToken.create.mock.calls,
    });


    expect(hash).toHaveBeenCalledWith('password123', 12);

    //TODO: Figure out how to test for whether prisma mock has been called
    // expect(prismaMock.client.create).toHaveBeenCalledWith({
    //   data: {
    //     email: uniqueEmail,
    //     password: 'hashedpassword',
    //     name: 'Test User',
    //     contactNumber: 12345678,  // Ensure this is an integer
    //     address: '123 Test St',
    //     postalCode: 123456,  // Ensure this is an integer
    //     active: false,
    //     image: null,
    //   },
    // });
    // expect(prismaMock.activateClientToken.create).toHaveBeenCalledWith({
    //   data: {
    //     clientId: user.id,
    //     token: `${uniqueToken}${uniqueToken}`.replace(/-/g, ""),
    //   },
    // });

    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ user: { email: uniqueEmail } });
    //Add the getClientDetails test here
    
  });

  it('should fetch client details by email', async () => {
    // const uniqueEmail = `test${Date.now()}@example.com`;
    const uniqueEmail = 'test@example.com';
    const user = {
      id: 50,
      email: uniqueEmail,
      name: 'Test User',
      password: 'hashedpassword',
      contactNumber: 12345678,
      address: '123 Test St',
      postalCode: 123456,
      active: false,
      image: null,
    };


    prismaMock.client.findUnique.mockResolvedValue(user);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: uniqueEmail,
      }),
    };

    const response = await getClientDetails(req as any);

    // expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
    //   where: { email: uniqueEmail },
    // });

    const jsonResponse = await response.json();
    console.log(jsonResponse)
    expect(jsonResponse).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
      contactNumber: user.contactNumber,
      address: user.address,
      postalCode: user.postalCode,
      image: user.image,
    });
  });

  it('should handle errors', async () => {
    const req = {
      json: jest.fn().mockRejectedValue(new Error('Test Error')),
    };

    const response = await POST(req as any);

    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ error: 'Test Error' });
  });
  
});

