// API Configuration
export const API_CONFIG = {
    BASE_URL: "https://talent-pool-server.vercel.app",
    ENDPOINTS: {
        SKILLS: "/api/v1/skill/skills",
        TALENTS: "/api/v1/talent/talents",
        CONTACT: "/api/v1/contact/create-form",
    },
} as const;

// Pagination Configuration
export const PAGINATION_CONFIG = {
    ITEMS_PER_PAGE: 6,
    DEFAULT_PAGE: 1,
} as const;

// UI Configuration
export const UI_CONFIG = {
    SKILL_BUTTON_COLORS: ["#C54809", "#1E9500", "#C54809", "#1E9500"],
    DESCRIPTION_MAX_LENGTH: 100,
    CARD_HEIGHT: {
        MOBILE: "h-[500px]",
        DESKTOP: "md:h-[473px]",
    },
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
    TRANSITION_DURATION: "duration-500",
    EASE_TYPE: "ease-in-out",
    HOVER_SCALE: "hover:scale-110",
    HOVER_TRANSLATE: "hover:-translate-y-1",
} as const;

// Accessibility Configuration
export const ACCESSIBILITY_CONFIG = {
    ARIA_LABELS: {
        TALENT_POOL: "DLT Africa Talent Pool",
        SKILL_FILTERS: "Filter talents by skills",
        TALENT_ACTIONS: "Talent actions",
        PAGINATION: "Pagination navigation",
    },
    ROLES: {
        GROUP: "group",
        BUTTON: "button",
        DIALOG: "dialog",
    },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
    FETCH_SKILLS: "Error fetching skills",
    FETCH_TALENTS: "Error fetching talents",
    NO_TALENTS: "No talent for these skills yet...",
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
    FETCHING_SKILLS: "Fetching skills..",
    LOADING_TALENTS: "Loading talents...",
} as const;
