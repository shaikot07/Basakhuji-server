

export interface IRentalHouse {
    location: string;
    description: string;
    rentAmount: number;
    bedrooms: number;
    amenities?: string; // Optional field for amenities
    images: string[];
    bath?: number;
    landlordId: string; // References User
    createdAt?: Date;
    updatedAt?: Date;
  }