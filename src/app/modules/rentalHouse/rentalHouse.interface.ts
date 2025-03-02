

export interface IRentalHouse {
    location: string;
    description: string;
    rentAmount: number;
    bedrooms: number;
    images: string[];
    landlordId: string; // References User
    createdAt?: Date;
    updatedAt?: Date;
  }