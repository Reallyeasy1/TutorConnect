import {Profile} from "./Profile";

export class Person {
    private profile: Profile;
    private gender: string;
    
    public constructor(profile: Profile, gender: string) {
      this.profile = profile;
      this.gender = gender;
    }
  }