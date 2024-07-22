import { prismaMock, resetPrismaMock } from "@/lib/prismaMock";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { POST as registerTutor } from "@/app/api/tutor/register/route";
import { sendMail } from "@/lib/mailService";

jest.mock('@/lib/mailService');
jest.mock('bcrypt');
jest.mock('crypto');

describe('Tutor API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetPrismaMock();
  });

  it('should register a tutor', async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;
    const uniqueToken = `uniqueToken${Date.now()}`;
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
      id: Date.now(), // Using Date.now() for unique user ID
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
      id: Date.now() + 1, // Ensuring a unique token ID
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

  it('should handle errors', async () => {
    const req = {
      json: jest.fn().mockRejectedValue(new Error('Test Error')),
    };

    const response = await registerTutor(req as any);

    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ error: 'Test Error' });
  });
});