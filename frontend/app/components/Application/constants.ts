export interface Option {
    id: number;
    tag: string;
    fee?: number;
}

export interface FormData {
    firstName: string;
    lastName: string;
    dob: string;
    academicQualification: string;
    courseSelected: string;
    classType: string;
    stateOfOrigin: string;
    gender: string;
    phoneNo: string;
    emailAddress: string;
    codeExperience: string;
    stateOfResidence: string;
    referralOption: string;
    referralName: string;
}

export interface CheckboxesChecked {
    newsletter: boolean;
    privacyPolicy: boolean;
    payment: boolean;
}

export const NIGERIAN_STATES: Option[] = [
    { id: 1, tag: "Abia" },
    { id: 2, tag: "Adamawa" },
    { id: 3, tag: "Akwa Ibom" },
    { id: 4, tag: "Anambra" },
    { id: 5, tag: "Bauchi" },
    { id: 6, tag: "Bayelsa" },
    { id: 7, tag: "Benue" },
    { id: 8, tag: "Borno" },
    { id: 9, tag: "Cross River" },
    { id: 10, tag: "Delta" },
    { id: 11, tag: "Ebonyi" },
    { id: 12, tag: "Edo" },
    { id: 13, tag: "Ekiti" },
    { id: 14, tag: "Enugu" },
    { id: 15, tag: "Gombe" },
    { id: 16, tag: "Imo" },
    { id: 17, tag: "Jigawa" },
    { id: 18, tag: "Kaduna" },
    { id: 19, tag: "Kano" },
    { id: 20, tag: "Katsina" },
    { id: 21, tag: "Kebbi" },
    { id: 22, tag: "Kogi" },
    { id: 23, tag: "Kwara" },
    { id: 24, tag: "Lagos" },
    { id: 25, tag: "Nasarawa" },
    { id: 26, tag: "Niger" },
    { id: 27, tag: "Ogun" },
    { id: 28, tag: "Ondo" },
    { id: 29, tag: "Osun" },
    { id: 30, tag: "Oyo" },
    { id: 31, tag: "Plateau" },
    { id: 32, tag: "Rivers" },
    { id: 33, tag: "Sokoto" },
    { id: 34, tag: "Taraba" },
    { id: 35, tag: "Yobe" },
    { id: 36, tag: "Zamfara" },
    { id: 37, tag: "Federal Capital Territory" },
];

export const GENDER_OPTIONS: Option[] = [
    { id: 1, tag: "Male" },
    { id: 2, tag: "Female" },
    { id: 3, tag: "Prefer Not To Mention" },
];

export const REFERRAL_OPTIONS: Option[] = [
    { id: 1, tag: "Social Media" },
    { id: 2, tag: "Friend" },
    { id: 3, tag: "Website" },
];

export const ACADEMIC_QUALIFICATIONS: Option[] = [
    { id: 1, tag: "Senior Secondary School Certificate (SSCE)" },
    { id: 2, tag: "Ordinary National Diploma (OND)" },
    { id: 3, tag: "Higher National Diploma (HND)" },
    { id: 4, tag: "BSc" },
];

export const CODING_EXPERIENCE: Option[] = [
    { id: 1, tag: "Beginner" },
    { id: 2, tag: "Intermediate" },
    { id: 3, tag: "Advanced" },
    { id: 4, tag: "Expert" },
];

export const CLASS_TYPES: Option[] = [
    { id: 1, tag: "Virtual" },
    { id: 2, tag: "Physical" },
];

export const ONLINE_COURSES: Option[] = [
    { id: 1, tag: "Frontend Development", fee: 320000 },
    { id: 2, tag: "Product UI/UX Design", fee: 170000 },
    { id: 3, tag: "Graphics Design", fee: 150000 },
];

export const PHYSICAL_COURSES: Option[] = [
    { id: 1, tag: "Frontend Development" },
    { id: 2, tag: "Full-Stack Development" },
    { id: 3, tag: "Product UI/UX Design" },
    { id: 4, tag: "Graphics Design" },
];

export const APPLICATION_DEADLINE = "2026-01-05";
