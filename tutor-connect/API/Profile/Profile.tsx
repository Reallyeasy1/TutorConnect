export class Profile {
    private name: string;
    private email: string;
    private contactNumber: number;
    private password: string | number;
    private address: string | number;

    public constructor(name: string, email: string, contactNumber: number, password: string | number, address: string | number) {
      this.name = name;
      this.email = email;
      this.contactNumber = contactNumber;
      this.password = password;
      this.address = address;
    }

    public getName(): string {
      return this.name;
    }
  }