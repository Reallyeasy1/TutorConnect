import { prismaMock, resetPrismaMock } from "@/lib/prismaMock";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { POST as registerTutor } from "@/app/api/tutor/register/route";
import { POST as updatePersonalInformation } from "@/app/api/tutor/profile/personal_information/route";
import { sendMail } from "@/lib/mailService";

jest.mock('@/lib/mailService');
jest.mock('bcrypt');
jest.mock('crypto');

describe('Tutor API Endpoints', () => {
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

  describe('Register Tutor', () => {
    it('should register a tutor', async () => {
      const req = {
        json: jest.fn().mockResolvedValue({
          email: uniqueEmail,
          password: 'password123',
          name: 'Test Tutor',
          contactNumber: '12345678',  // Mock data as string
          dateOfBirth: '1990-01-01T00:00:00Z',
          gender: 'Male',
          age: '30',  // Mock data as string
          nationality: 'Singaporean',
          race: 'Chinese',
          levelAndSubjects: { primary: ['Math', 'Science'], secondary: ['Physics'] },
          location: ['Singapore'],
          typeOfTutor: 'Private Tutor',
          yearsOfExperience: '5',  // Mock data as string
          highestEducationLevel: 'Bachelor',
        }),
      };

      const hashedPassword = 'hashedpassword';
      const user = {
        id: userId, // Using Date.now() for unique user ID
        email: uniqueEmail,
        password: hashedPassword,
        name: 'Test Tutor',
        contactNumber: 12345678,  // Ensure this is an integer
        dateOfBirth: new Date('1990-01-01T00:00:00Z'),
        gender: 'Male',
        age: 30,  // Ensure this is an integer
        nationality: 'Singaporean',
        race: 'Chinese',
        levelAndSubjects: { primary: ['Math', 'Science'], secondary: ['Physics'] },
        location: ['Singapore'],
        typeOfTutor: 'Private Tutor',
        yearsOfExperience: 5,  // Ensure this is an integer
        highestEducationLevel: 'Bachelor',
        active: false,
        image: null,
        introduction: null,
        summary: null,
        studentsResults: null,
      };

      const token = {
        id: userId + 1, // Ensuring a unique token ID
        tutorId: user.id,
        token: `${uniqueToken}${uniqueToken}`.replace(/-/g, ""),
        createdAt: new Date(),
        activatedAt: null,
      };

      (hash as jest.Mock).mockResolvedValue(hashedPassword);
      (randomUUID as jest.Mock).mockReturnValueOnce(uniqueToken).mockReturnValueOnce(uniqueToken);
      prismaMock.tutor.create.mockResolvedValue(user);
      prismaMock.activateTutorToken.create.mockResolvedValue(token);

      const response = await registerTutor(req as any);

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      expect(hash).toHaveBeenCalledWith('password123', 12);

      expect(responseData).toEqual({ user: { email: uniqueEmail } });

      // Verify email sending
      expect(sendMail).toHaveBeenCalledWith(
        expect.stringContaining('<lowethan11@gmail.com>'),
        uniqueEmail,
        'Please Activate Your Account',
        expect.stringContaining('Please click on the link below to activate your account:')
      );
    });

    it('should handle errors during tutor registration', async () => {
      const req = {
        json: jest.fn().mockRejectedValue(new Error('Test Error')),
      };

      const response = await registerTutor(req as any);

      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Test Error' });
    });

    it('should return 500 when required fields are missing', async () => {
      const req = {
        json: jest.fn().mockResolvedValue({
          email: uniqueEmail,
          // Missing password and other required fields
        }),
      };

      const response = await registerTutor(req as any);

      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse.error).toContain('Invalid `prisma.tutor.create()` invocation');
    });

   
  });

  describe('Update Tutor Personal Information', () => {
    it('should update tutor personal information successfully', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      formDataMock.append('contactNumber', '12345678');
      formDataMock.append('dateOfBirth', '1990-01-01T00:00:00Z');
      formDataMock.append('gender', 'Male');
      formDataMock.append('age', '30');
      formDataMock.append('nationality', 'Singaporean');
      formDataMock.append('race', 'Chinese');
      formDataMock.append('image', 'test_image.png');

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      const updatedTutor = {
        id: userId,
        email: uniqueEmail,
        password: 'hashedpassword',
        name: 'Test Tutor',
        contactNumber: 12345678,
        dateOfBirth: new Date('1990-01-01T00:00:00Z'),
        gender: 'Male',
        age: 30,
        nationality: 'Singaporean',
        race: 'Chinese',
        levelAndSubjects: { primary: ['Math', 'Science'], secondary: ['Physics'] },
        location: ['Singapore'],
        typeOfTutor: 'Private Tutor',
        yearsOfExperience: 5,
        highestEducationLevel: 'Bachelor',
        active: false,
        image: 'test_image.png',
        introduction: null,
        summary: null,
        studentsResults: null,
      };

      // Mock the tutor creation before updating profile
      prismaMock.tutor.create.mockResolvedValue(updatedTutor);
      prismaMock.tutor.update.mockResolvedValue(updatedTutor);

      // Register the tutor
      const registerReq = {
        json: jest.fn().mockResolvedValue({
          email: uniqueEmail,
          password: 'password123',
          name: 'Test Tutor',
          contactNumber: '12345678',
          dateOfBirth: '1990-01-01T00:00:00Z',
          gender: 'Male',
          age: '30',
          nationality: 'Singaporean',
          race: 'Chinese',
          levelAndSubjects: { primary: ['Math', 'Science'], secondary: ['Physics'] },
          location: ['Singapore'],
          typeOfTutor: 'Private Tutor',
          yearsOfExperience: '5',
          highestEducationLevel: 'Bachelor',
        }),
      };
      await registerTutor(registerReq as any);

      const response = await updatePersonalInformation(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(200);
      expect(jsonResponse).toEqual({ success: "Changes made successfully" });
    });

    it('should return 400 if any required field is missing', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      // Missing contactNumber, dateOfBirth, gender, age, nationality, and race

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      const response = await updatePersonalInformation(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(400);
      expect(jsonResponse).toEqual({ error: "All fields are required." });
    });

    it('should return 500 if provided invalid data', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      formDataMock.append('contactNumber', 'invalid-number');
      formDataMock.append('dateOfBirth', 'invalid-date');
      formDataMock.append('gender', 'Male');
      formDataMock.append('age', 'invalid-age');
      formDataMock.append('nationality', 'Singaporean');
      formDataMock.append('race', 'Chinese');

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      const response = await updatePersonalInformation(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({ error: "An unexpected error occurred. Please try again and if the problem persists, contact support." });
    });

    it('should handle non-existent email gracefully', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      formDataMock.append('contactNumber', '12345678');
      formDataMock.append('dateOfBirth', '1990-01-01T00:00:00Z');
      formDataMock.append('gender', 'Male');
      formDataMock.append('age', '30');
      formDataMock.append('nationality', 'Singaporean');
      formDataMock.append('race', 'Chinese');

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      prismaMock.tutor.update.mockRejectedValue(new Error('An unexpected error occurred. Please try again and if the problem persists, contact support.'));

      const response = await updatePersonalInformation(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({
        error: "An unexpected error occurred. Please try again and if the problem persists, contact support.",
      });
    });

    it('should handle unexpected errors gracefully', async () => {
      const formDataMock = new FormData();
      formDataMock.append('email', uniqueEmail);
      formDataMock.append('contactNumber', '12345678');
      formDataMock.append('dateOfBirth', '1990-01-01T00:00:00Z');
      formDataMock.append('gender', 'Male');
      formDataMock.append('age', '30');
      formDataMock.append('nationality', 'Singaporean');
      formDataMock.append('race', 'Chinese');

      const req = {
        formData: jest.fn().mockResolvedValue(formDataMock),
      } as unknown as Request;

      prismaMock.tutor.update.mockRejectedValue(new Error('Test Error'));

      const response = await updatePersonalInformation(req);
      const jsonResponse = await response.json();

      expect(response.status).toBe(500);
      expect(jsonResponse).toEqual({
        error: "An unexpected error occurred. Please try again and if the problem persists, contact support.",
      });
    });
  });
});
