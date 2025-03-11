

export interface IRentalRequest {
    rentalHouseId: string;
    tenantId: string;
    status: "pending" | "approved" | "rejected";
    landlordPhoneNumber?: string; // Only available if approved
    paymentStatus?: "pending" | "paid"; // Only relevant for approved requests
    additionalMessage?: string;
    moveInDate: string;
    rentalDuration: string;
}