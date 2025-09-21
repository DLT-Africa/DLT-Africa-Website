const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      minlength: [3, "Event name must be at least 3 characters"],
      maxlength: [100, "Event name cannot exceed 100 characters"],
    },
    eventCategory: {
      type: String,
      required: [true, "Event category is required"],
      trim: true,
      enum: {
        values: [
          "Workshop",
          "Conference",
          "Hackathon",
          "Meetup",
          "Training",
          "Webinar",
          "Other",
        ],
        message: "Please select a valid event category",
      },
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      default: "Hackathon",
      trim: true,
      enum: {
        values: ["Physical", "Virtual", "Hybrid"],
        message: "Please select a valid event type",
      },
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Start date must be in the future",
      },
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    eventRegLink: {
      type: String,
      required: [true, "Registration link is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    eventVenue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
      maxlength: [200, "Venue cannot exceed 200 characters"],
    },
    media: {
      type: String,
      default: "https://shorturl.at/K2L0Y",
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    eventDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    maxParticipants: {
      type: Number,
      min: [1, "Maximum participants must be at least 1"],
    },
    currentParticipants: {
      type: Number,
      default: 0,
      min: [0, "Current participants cannot be negative"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Fix virtual properties to use correct field names
eventSchema.virtual("isUpcoming").get(function () {
  return this.startDate > new Date();
});

eventSchema.virtual("isPast").get(function () {
  return this.endDate < new Date();
});

eventSchema.virtual("isOngoing").get(function () {
  const now = new Date();
  return this.startDate <= now && this.endDate >= now;
});

// Add indexes for better query performance
eventSchema.index({ startDate: 1 });
eventSchema.index({ eventCategory: 1 });
eventSchema.index({ isActive: 1 });
eventSchema.index({ createdAt: -1 });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
