"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>(""); // "success" or "error"
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      return;
    }

    // Restore body scroll when modal is closed
    document.body.style.overflow = "unset";

    // Cleanup function to restore scroll when component unmounts
    return () => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://dlt-backend.vercel.app/api/v1"
        }/api/v1/waitlist/join`,
        formData
      );

      if (response.status === 201) {
        setMessage(
          "Successfully joined waitlist! Check your email for confirmation."
        );
        setMessageType("success");
        setFormData({ name: "", email: "", phone: "" });

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setMessage("");
          setMessageType("");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error joining waitlist:", error);
      setMessage(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to join waitlist. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Typography
              className="text-2xl font-semibold text-black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Join Waitlist
            </Typography>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <Typography
              className="text-gray-600 text-sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Be the first to know when our next cohort opens! Get early access
              to registration and special announcements.
            </Typography>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              size="lg"
              name="name"
              variant="static"
              label="Full Name"
              className="pl-4 text-lg"
              labelProps={{
                className: "!text-black",
              }}
              containerProps={{
                className: "h-14",
              }}
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              crossOrigin={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            <Input
              size="lg"
              type="email"
              name="email"
              variant="static"
              label="Email Address"
              className="pl-4 text-lg"
              labelProps={{
                className: "!text-black",
              }}
              containerProps={{
                className: "h-14",
              }}
              placeholder="yourname@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              crossOrigin={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            <Input
              size="lg"
              type="tel"
              name="phone"
              variant="static"
              label="Phone Number (Optional)"
              className="pl-4 text-lg"
              labelProps={{
                className: "!text-black",
              }}
              containerProps={{
                className: "h-14",
              }}
              placeholder="+234 800 000 0000"
              value={formData.phone}
              onChange={handleChange}
              crossOrigin={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />

            {/* Message Display */}
            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  messageType === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outlined"
                size="lg"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={onClose}
                disabled={isSubmitting}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-[#FC7C13] hover:bg-[#e66a0a] transition duration-500 ease-in-out transform hover:-translate-y-1"
                disabled={isSubmitting || !formData.name || !formData.email}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Only render on client side to avoid SSR issues
  if (
    !mounted ||
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return createPortal(modalContent, document.body);
};

export default WaitlistModal;
