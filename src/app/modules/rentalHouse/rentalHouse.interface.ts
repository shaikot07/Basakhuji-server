

export interface IRentalHouse {
    location: string;
    description: string;
    rentAmount: number;
    bedrooms: number;
    bath?: number;
    amenities: string;
    images: string[];
    landlordId: string; // References User
    createdAt?: Date;
    updatedAt?: Date;
  }