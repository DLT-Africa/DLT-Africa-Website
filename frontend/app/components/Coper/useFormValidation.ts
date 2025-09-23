import { useState, useCallback } from 'react';

interface FormData {
    fullName: string;
    emailAddress: string;
    phone_number: string;
    gender: string;
    stateOfOrigin: string;
    corp_id: string;
    course_selected: string;
    batchResumption: string;
}

interface ValidationErrors {
    [key: string]: string;
}

export const useFormValidation = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone);
    };

    const validateName = (name: string): boolean => {
        return name.trim().length >= 2;
    };

    const validateForm = useCallback((formData: FormData): boolean => {
        const newErrors: ValidationErrors = {};

        // Required field validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (!validateName(formData.fullName)) {
            newErrors.fullName = "Full name must be at least 2 characters";
        }

        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = "Email address is required";
        } else if (!validateEmail(formData.emailAddress)) {
            newErrors.emailAddress = "Please enter a valid email address";
        }

        if (!formData.phone_number.trim()) {
            newErrors.phone_number = "Phone number is required";
        } else if (!validatePhone(formData.phone_number)) {
            newErrors.phone_number = "Please enter a valid phone number (10-11 digits)";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select a gender";
        }

        if (!formData.stateOfOrigin) {
            newErrors.stateOfOrigin = "Please select a state of origin";
        }

        if (!formData.corp_id) {
            newErrors.corp_id = "Please upload your corp member ID";
        }

        if (!formData.course_selected) {
            newErrors.course_selected = "Please select a course";
        }

        if (!formData.batchResumption) {
            newErrors.batchResumption = "Please select a resumption batch";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, []);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    const getFieldError = useCallback((fieldName: string): string => {
        return errors[fieldName] || '';
    }, [errors]);

    return {
        errors,
        validateForm,
        clearErrors,
        getFieldError,
        validateEmail,
        validatePhone,
        validateName,
    };
};
