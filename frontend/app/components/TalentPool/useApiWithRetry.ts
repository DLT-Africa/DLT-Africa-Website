import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

interface RetryConfig {
    maxRetries: number;
    retryDelay: number;
    backoffMultiplier: number;
}

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    retryDelay: 1000,
    backoffMultiplier: 2,
};

export const useApiWithRetry = <T>(
    retryConfig: Partial<RetryConfig> = {}
) => {
    const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const executeWithRetry = useCallback(
        async (
            apiCall: () => Promise<T>,
            onSuccess?: (data: T) => void,
            onError?: (error: string) => void
        ) => {
            setState(prev => ({ ...prev, loading: true, error: null }));

            let lastError: string = '';

            for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
                try {
                    const data = await apiCall();
                    setState({ data, loading: false, error: null });
                    onSuccess?.(data);
                    return data;
                } catch (error) {
                    const axiosError = error as AxiosError;
                    lastError = (axiosError.response?.data as any)?.message || axiosError.message || 'An error occurred';

                    if (attempt === config.maxRetries) {
                        setState(prev => ({ ...prev, loading: false, error: lastError }));
                        onError?.(lastError);
                        return;
                    }

                    // Wait before retrying with exponential backoff
                    const delay = config.retryDelay * Math.pow(config.backoffMultiplier, attempt);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        },
        [config]
    );

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    return {
        ...state,
        executeWithRetry,
        reset,
    };
};
