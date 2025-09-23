import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants';

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

interface SubmissionState {
    isSubmitting: boolean;
    error: string | null;
    success: boolean;
}

export const useFormSubmission = () => {
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        isSubmitting: false,
        error: null,
        success: false,
    });

    const router = useRouter();

    const submitForm = useCallback(async (formData: FormData): Promise<boolean> => {
        setSubmissionState({
            isSubmitting: true,
            error: null,
            success: false,
        });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/cohorts/corperreg`,
                formData,
                {
                    timeout: 30000, // 30 second timeout
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                setSubmissionState({
                    isSubmitting: false,
                    error: null,
                    success: true,
                });

                // Store success state in localStorage
                localStorage.setItem("isLoggedIn", "true");

                // Navigate to success page
                router.push("/congratsCorp");

                return true;
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            let errorMessage: string = ERROR_MESSAGES.SERVER_ERROR;

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with error status
                    const status = error.response.status;
                    const data = error.response.data;

                    if (status === 400) {
                        errorMessage = ERROR_MESSAGES.DUPLICATE_EMAIL;
                    } else if (status === 422) {
                        errorMessage = data?.message || "Please check your form data and try again.";
                    } else if (status >= 500) {
                        errorMessage = "Server is temporarily unavailable. Please try again later.";
                    }
                } else if (error.request) {
                    // Network error
                    errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
                } else {
                    // Other error
                    errorMessage = error.message || ERROR_MESSAGES.SERVER_ERROR;
                }
            }

            setSubmissionState({
                isSubmitting: false,
                error: errorMessage,
                success: false,
            });

            return false;
        }
    }, [router]);

    const clearError = useCallback(() => {
        setSubmissionState(prev => ({
            ...prev,
            error: null,
        }));
    }, []);

    const resetSubmissionState = useCallback(() => {
        setSubmissionState({
            isSubmitting: false,
            error: null,
            success: false,
        });
    }, []);

    return {
        submissionState,
        submitForm,
        clearError,
        resetSubmissionState,
    };
};
