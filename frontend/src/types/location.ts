export interface Location {
  _id: string;
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
