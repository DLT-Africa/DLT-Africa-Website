// Form Configuration
export const FORM_CONFIG = {
    API_ENDPOINT: "/cohorts/corperreg",
    MAX_FILE_SIZE: 5 * 1024 * 1024,
    ALLOWED_FILE_TYPES: ["image/jpeg", "image/jpg", "image/png"],
    CLOUDINARY_UPLOAD_URL: "https://api.cloudinary.com/v1_1",
} as const;

// Form Field Configuration
export const FIELD_CONFIG = {
    PHONE_PATTERN: "[0-9]{10,11}",
    PLACEHOLDERS: {
        FULL_NAME: "Alexander Wong",
        EMAIL: "Wong@example.com",
        PHONE: "08122222221",
    },
    LABELS: {
        FULL_NAME: "Full name",
        EMAIL: "Email Address",
        PHONE: "Phone Number",
        GENDER: "Gender",
        STATE: "State of origin",
        CORP_ID: "Corp member ID",
        COURSE: "Courses for copers",
        BATCH: "Resumption batch",
    },
} as const;

// Nigerian States
export const NIGERIAN_STATES = [
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
] as const;

// Gender Options
export const GENDER_OPTIONS = [
    { id: 1, tag: "Male" },
    { id: 2, tag: "Female" },
    { id: 3, tag: "Prefer Not To Mention" },
] as const;

// Course Options
export const COURSE_OPTIONS = [
    { id: 1, tag: "Web Start Essentials" },
    { id: 2, tag: "CodeMaster Intermediate" },
    { id: 3, tag: "Product Management" },
] as const;

// Resumption Batch Options
export const RESUMPTION_BATCH_OPTIONS = [
    { id: 1, tag: "November 2024 Entry" },
    { id: 2, tag: "July 2025 Entry" },
    { id: 3, tag: "March 2025 Entry" },
] as const;

// Error Messages
export const ERROR_MESSAGES = {
    ALL_FIELDS_REQUIRED: "Oops! All fields are required.",
    INVALID_IMAGE_FORMAT: "Invalid image format. Only JPEG, JPG, and PNG are allowed.",
    IMAGE_UPLOAD_FAILED: "Error uploading image. Please try again.",
    DUPLICATE_EMAIL: "An applicant with the same email address already exists.",
    SERVER_ERROR: "Server error. Unable to process your registration.",
    NETWORK_ERROR: "Network error. Please check your connection and try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
    REGISTRATION_SUCCESS: "Registration completed successfully!",
    IMAGE_UPLOAD_SUCCESS: "Image uploaded successfully!",
} as const;

// UI Configuration
export const UI_CONFIG = {
    FORM_STYLES: {
        CONTAINER: "flex flex-col gap-[24px] bg-[#FFEFD4] px-[39px] rounded-[20px] py-[80px] md:px-[56px] md:mb-[218px] md:py-[91px] xl:px-[86px] max-w-[889px] text-[#1c1c1c]",
        INPUT: "bg-transparent outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px]",
        SELECT: "outline-none border-b-[1px] border-b-[#1C1C1C] pl-[16px] font-body font-normal text-[18px] w-full bg-transparent",
        BUTTON: "py-[15px] px-[65px] text-center bg-[#FC7C13] rounded-xl text-[16px] font-poppins font-medium text-[#F7FCFE]",
        UPLOAD_BUTTON: "bg-[#FC7C13] py-1 px-4 text-[14px] rounded cursor-pointer",
    },
} as const;
