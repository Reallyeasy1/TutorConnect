import { POST as registerClient } from "@/app/api/client/register/route";
import { POST as getClientDetails } from "@/app/api/client/getClientDetails/route";
import { POST as editClientProfile } from "@/app/api/client/edit_profile/route";
import { prismaMock, resetPrismaMock } from "@/lib/prismaMock";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";

jest.mock('@/lib/mailService');
jest.mock('bcrypt');
jest.mock('crypto');

describe('Client API Endpoints', () => {
  let uniqueEmail: string;
  let uniqueToken: string;
  let userId: number;

  beforeEach(() => {
    jest.clearAllMocks();
    resetPrismaMock();
    uniqueEmail = `test${Date.now()}@example.com`;
    uniqueToken = `uniqueToken${Date.now()}`;
    userId = Date.now();
  });

  describe('Register Client', () => {
    it('should create a client', async () => {
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
        id: userId, // Using userId for unique user ID
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
        id: userId + 1, // Ensuring a unique token ID
        clientId: user.id,
        token: `${uniqueToken}${uniqueToken}`.replace(/-/g, ""),
        createdAt: new Date(),
        activatedAt: null,
      };

      (hash as jest.Mock).mockResolvedValue('hashedpassword');
      (randomUUID as jest.Mock).mockReturnValueOnce(uniqueToken).mockReturnValueOnce(uniqueToken);
      prismaMock.client.create.mockResolvedValue(user);
      prismaMock.activateClientToken.create.mockResolvedValue(token);

      const response = await registerClient(req as any);

      console.log('Mock calls:', {
        hashCalls: (hash as jest.Mock).mock.calls,
        clientCreateCalls: prismaMock.client.create.mock.calls,
        tokenCreateCalls: prismaMock.activateClientToken.create.mock.calls,
      });

      expect(hash).toHaveBeenCalledWith('password123', 12);

      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ user: { email: uniqueEmail } });
    });

    it('should handle errors during client creation', async () => {
      const req = {
        json: jest.fn().mockRejectedValue(new Error('Test Error')),
      };

      const response = await registerClient(req as any);

      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Test Error' });
    });
  });

  describe('Fetch Client Details', () => {
    it('should fetch client details by email', async () => {
      const user = {
        id: userId,
        email: uniqueEmail,
        name: 'Test User',
        password: 'hashedpassword',
        contactNumber: 12345678,
        address: '123 Test St',
        postalCode: 123456,
        active: false,
        image: null,
        notifications: [
          {
            id: 12,
            read: false,
            clientId: userId,
            date: '2024-07-21T08:10:57.088Z',
            assignmentId: null,
            tutorId: 30,
            type: 'apply'
          }
        ]
      };

      // Mock the client creation before fetching details
      prismaMock.client.create.mockResolvedValue(user);
      prismaMock.client.findUnique.mockResolvedValue(user);

      // Register the client
      const registerReq = {
        json: jest.fn().mockResolvedValue({
          email: uniqueEmail,
          password: 'password123',
          name: 'Test User',
          contactNumber: '12345678',
          address: '123 Test St',
          postalCode: '123456',
        }),
      };
      await registerClient(registerReq as any);

      // Fetch client details
      const req = {
        json: jest.fn().mockResolvedValue({
          email: uniqueEmail,
        }),
      };

      const response = await getClientDetails(req as any);

      const jsonResponse = await response.json();
      console.log(jsonResponse);

      expect(jsonResponse).toEqual({
        id: jsonResponse.id,
        email: user.email,
        name: user.name,
        contactNumber: user.contactNumber,
        address: user.address,
        postalCode: user.postalCode,
        image: null,
        notifications:[],
      });
    });
  });

  describe('Edit Client Profile', () => {
    it('should update client profile successfully', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      formDataMock.append('contactNumber', '12345678');
      formDataMock.append('address', '123 Test St');
      formDataMock.append('postalCode', '123456');
      formDataMock.append('image', 'test_image.png');

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      const user = {
        id: userId,
        email: uniqueEmail,
        password: 'hashedpassword',
        name: 'Test User',
        contactNumber: 12345678,
        address: '123 Test St',
        postalCode: 123456,
        active: false,
        image: 'test_image.png',
      };

      // Mock the client creation before updating profile
      prismaMock.client.create.mockResolvedValue(user);
      prismaMock.client.update.mockResolvedValue(user);

      // Register the client
      const registerReq = {
        json: jest.fn().mockResolvedValue({
          email: uniqueEmail,
          password: 'password123',
          name: 'Test User',
          contactNumber: '12345678',
          address: '123 Test St',
          postalCode: '123456',
        }),
      };
      await registerClient(registerReq as any);

      // Update client profile
      const response = await editClientProfile(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(200);
      expect(jsonResponse).toEqual({ success: "Changes made successfully" });
    });

    it('should return 400 if any required field is missing', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      // Missing contactNumber, address, and postalCode

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      const response = await editClientProfile(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(400);
      expect(jsonResponse).toEqual({ error: "All fields are required." });
    });

    it('should handle unexpected errors gracefully', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      formDataMock.append('contactNumber', '12345678');
      formDataMock.append('address', '123 Test St');
      formDataMock.append('postalCode', '123456');

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      prismaMock.client.update.mockRejectedValue(new Error('Test Error'));

      const response = await editClientProfile(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({
        error: "An unexpected error occurred. Please try again and if the problem persists, contact support.",
      });
    });
  });
});
