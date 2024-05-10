import {Profile} from "./Profile";
import {Person} from "./Person";

export class Tutee extends Person {
    private tuteeName: string;
    private level: string | number;
    private subject: string | number;
    private lessonsPerWeek: number;
    private duration: number;
    private budget: number;

    public constructor(profile: Profile, gender: string, tuteeName: string, level: string | number, subject: string | number, lessonsPerWeek: number, duration: number, budget: number) {
      super(profile, gender);
      this.tuteeName = tuteeName;
      this.level = level;
      this.subject = subject;
      this.lessonsPerWeek = lessonsPerWeek;
      this.duration = duration;
      this.budget = budget;
    }
  }