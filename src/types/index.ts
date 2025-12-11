export type InsuranceCategory = 'coche' | 'salud' | 'casa' | 'electronica';

export interface Insurance {
  id: string;
  title: string;
  company: string;
  policyNumber: string;
  category: InsuranceCategory;
  expiryDate: Date;
  imageUrl?: string;
  phoneNumber?: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
}
