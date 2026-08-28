export type Rating = 0 | 1 | 2 | 3 | 4;
export type Symptom = { rating: Rating; example: string; duration: string };
export type Assessment = { user: { name: string; age: string; dob: string; role: string; education: string; country: string; date: string }; inattentive: Symptom[]; hyperactive: Symptom[]; duration: string; childhood: Record<number,string>; childNotes:string; settings:Record<number,Rating>; impairment:Record<number,Rating>; executive:Record<number,Rating>; differential:Record<number,Rating>; collateral:{type:string;note:string} };
