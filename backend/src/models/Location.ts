import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  city: string;
  state: string;
  pinCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Location name is required'],
      trim: true,
      maxlength: [100, 'Location name cannot exceed 100 characters'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    pinCode: {
      type: String,
      required: [true, 'PIN code is required'],
      trim: true,
      match: [/^\d{6}$/, 'Please enter a valid 6-digit PIN code'],
    },
    coordinates: {
      latitude: {
        type: Number,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90'],
      },
      longitude: {
        type: Number,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180'],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
LocationSchema.index({ city: 1 });
LocationSchema.index({ state: 1 });
LocationSchema.index({ pinCode: 1 });
LocationSchema.index({ isActive: 1 });
LocationSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

// Compound index for location searches
LocationSchema.index({ city: 1, state: 1 });

export default mongoose.model<ILocation>('Location', LocationSchema);
