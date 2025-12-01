export interface Service {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: number;
  image: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
