import { useState, useCallback } from 'react';
import { FORM_CONFIG, ERROR_MESSAGES } from './constants';

interface UploadState {
    isUploading: boolean;
    progress: number;
    error: string | null;
    imageUrl: string | null;
}

export const useImageUpload = () => {
    const [uploadState, setUploadState] = useState<UploadState>({
        isUploading: false,
        progress: 0,
        error: null,
        imageUrl: null,
    });

    const uploadImageToCloudinary = useCallback(async (image: File): Promise<string | null> => {
        // Validate file type
        if (!FORM_CONFIG.ALLOWED_FILE_TYPES.includes(image.type as any)) {
            setUploadState(prev => ({
                ...prev,
                error: ERROR_MESSAGES.INVALID_IMAGE_FORMAT,
            }));
            return null;
        }

        // Validate file size
        if (image.size > FORM_CONFIG.MAX_FILE_SIZE) {
            setUploadState(prev => ({
                ...prev,
                error: "File size must be less than 5MB",
            }));
            return null;
        }

        setUploadState(prev => ({
            ...prev,
            isUploading: true,
            progress: 0,
            error: null,
        }));

        const formData = new FormData();
        formData.append("file", image);
        formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME || "");
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET || "");

        try {
            const response = await fetch(
                `${FORM_CONFIG.CLOUDINARY_UPLOAD_URL}/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Upload failed with status: ${response.status}`);
            }

            const imgData = await response.json();

            if (!imgData.url) {
                throw new Error("Image upload failed. No URL returned.");
            }

            setUploadState(prev => ({
                ...prev,
                isUploading: false,
                progress: 100,
                error: null,
                imageUrl: imgData.url,
            }));

            return imgData.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploadState(prev => ({
                ...prev,
                isUploading: false,
                progress: 0,
                error: ERROR_MESSAGES.IMAGE_UPLOAD_FAILED,
                imageUrl: null,
            }));
            return null;
        }
    }, []);

    const resetUploadState = useCallback(() => {
        setUploadState({
            isUploading: false,
            progress: 0,
            error: null,
            imageUrl: null,
        });
    }, []);

    return {
        uploadState,
        uploadImageToCloudinary,
        resetUploadState,
    };
};
