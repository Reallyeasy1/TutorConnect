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