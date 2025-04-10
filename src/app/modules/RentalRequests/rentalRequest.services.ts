/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from "http-status";
// import AppError from "../../errors/AppError";
// import { IRentalHouse } from "../rentalHouse/rentalHouse.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IRentalHouse } from "../rentalHouse/rentalHouse.interface";
import { IRentalRequest } from "./rentalRequest.interface";
import { RentalRequestModel } from "./rentalRequest.model";
import { sendEmail } from "../../utils/sendEmail";


const createRentalRequestToDB = async (rentalRequest: IRentalRequest) => {
    const result = await RentalRequestModel.create(rentalRequest);
    return result;
};



const getRentalRequestsByTenant = async (tenantId: string) => {
    const result = await RentalRequestModel.find({ tenantId }).populate("rentalHouseId");
    return result;
};


const getRentalRequestsByLandlord = async (landlordId: string) => {
    const result = await RentalRequestModel.find()
        .populate({
            path: "rentalHouseId",
            match: { landlordId }, // ✅ Only fetch properties owned by the landlord
        });

    // Remove requests where rentalHouseId is null (since match might exclude some)
    return result.filter(request => request.rentalHouseId !== null);
}




// const updatedRentalRequestStatusByLanload = async (requestId: string,status: "approved" | "rejected", landlordPhoneNumber?: string, landlordId?: string 
// ) => {
//     console.log("request to update ID from services:", requestId);
//     console.log("to update:  from services", status);
//     console.log("  from services", landlordId);

//     // find the rental request first
//     const rentalRequest = await RentalRequestModel.findById(requestId).populate<{ rentalHouseId: IRentalHouse }>("rentalHouseId");
//     if (!rentalRequest) {
      
//         throw new AppError(
//           httpStatus.NOT_FOUND,`${ landlordId} Rental request not found!` ,
//         );
//     }

//     console.log(" Found rental request:", rentalRequest);

//     //  Check if the landlord is the owner of the rental house
//     if (!rentalRequest.rentalHouseId || rentalRequest.rentalHouseId?.landlordId?.toString() !== landlordId) {
//         throw new AppError(
//           httpStatus.UNAUTHORIZED,` ${ landlordId} You are not authorized to update this request.`,
//         );
//     }

//     // Prepare update data
//     const updateData: any = { status };
//     if (status === "approved" && landlordPhoneNumber) {
//         updateData.landlordPhoneNumber = landlordPhoneNumber;
//     }

//     console.log("🔍 Data to be updated:", updateData);

//     // 4️⃣ Perform the update
//     const result = await RentalRequestModel.findByIdAndUpdate(requestId, updateData, {
//         new: true,
//         runValidators: true,
//     });

//     console.log("✅ Update result:", result);

//     return result;
// };



// 1Update the rental request status by landlord
// ----------with emaile notifyfor aprove or reject-------------------

const updatedRentalRequestStatusByLanload = async (requestId: string, status: "approved" | "rejected", landlordPhoneNumber?: string, landlordId?: string) => {
    console.log("Request to update ID from services:", requestId);
    console.log("To update:  from services", status);
    console.log("From services", landlordId);

    // Find the rental request first
    const rentalRequest = await RentalRequestModel.findById(requestId)
        .populate<{ rentalHouseId: IRentalHouse }>("rentalHouseId")
        .populate<{ tenantId: { email: string; name: string } }>('tenantId');
    if (!rentalRequest) {
        throw new AppError(
          httpStatus.NOT_FOUND, `${landlordId} Rental request not found!`
        );
    }

    console.log("Found rental request:", rentalRequest);

    // Check if the landlord is the owner of the rental house
    if (!rentalRequest.rentalHouseId || rentalRequest.rentalHouseId?.landlordId?.toString() !== landlordId) {
        throw new AppError(
          httpStatus.UNAUTHORIZED, `${landlordId} You are not authorized to update this request.`
        );
    }

    // Prepare update data
    const updateData: any = { status };
    if (status === "approved" && landlordPhoneNumber) {
        updateData.landlordPhoneNumber = landlordPhoneNumber;
    }

    console.log("🔍 Data to be updated:", updateData);

    // Perform the update
    const result = await RentalRequestModel.findByIdAndUpdate(requestId, updateData, {
        new: true,
        runValidators: true,
    });

    console.log("✅ Update result:", result);

    // Prepare email content dynamically based on the status
    const tenantEmail = rentalRequest?.tenantId?.email || 'default@example.com';
    const tenantName = rentalRequest?.tenantId?.name || 'Tenant';
    const rentalHouseLocation = rentalRequest.rentalHouseId?.location || 'Not available';
    const moveInDate = new Date(rentalRequest.moveInDate).toLocaleDateString() || 'Not specified';
    const rentalDuration = rentalRequest.rentalDuration || 'Not specified';
    const landlordPhoneNumberText = rentalRequest?.landlordPhoneNumber || 'not available';

    let subject = '';
    let text = '';
    let html = '';

    // If status is "approved"
    if (status === "approved") {
        subject = `Your rental request for ${rentalHouseLocation} has been approved!`;

        text = `
          Dear ${tenantName},
          
          We are happy to inform you that your rental request for the property located at ${rentalHouseLocation} has been approved! 🎉

          Here are the details of your request:
          
          - **Move-in Date**: ${moveInDate}
          - **Rental Duration**: ${rentalDuration} months
          
          Please get in touch with the landlord at ${landlordPhoneNumberText} for further steps.

          Best regards,
          Basakhuji Team
        `;

        html = `
          <h1>Dear ${tenantName},</h1>
          <p>We are happy to inform you that your rental request for the property located at <strong>${rentalHouseLocation}</strong> has been approved! 🎉</p>
          <h3>Here are the details of your request:</h3>
          <ul>
            <li><strong>Move-in Date:</strong> ${moveInDate}</li>
            <li><strong>Rental Duration:</strong> ${rentalDuration} months</li>
          </ul>
          <p>Please get in touch with the landlord at <strong>${landlordPhoneNumberText}</strong> for further steps.</p>
          <br>
          <p>Best regards,</p>
          <p>Basakhuji Team</p>
        `;
    }

    // If status is "rejected"
    if (status === "rejected") {
        subject = `Your rental request for ${rentalHouseLocation} has been rejected`;

        text = `
          Dear ${tenantName},
          
          We regret to inform you that your rental request for the property located at ${rentalHouseLocation} has been rejected. 😞

          Here are the details of your request:
          
          - **Move-in Date**: ${moveInDate}
          - **Rental Duration**: ${rentalDuration} months

          Unfortunately, your request has not been approved by the landlord at this time. Please feel free to reach out to the landlord for further clarification.

          Best regards,
          Basakhuji Team
        `;

        html = `
          <h1>Dear ${tenantName},</h1>
          <p>We regret to inform you that your rental request for the property located at <strong>${rentalHouseLocation}</strong> has been rejected. 😞</p>
          <h3>Here are the details of your request:</h3>
          <ul>
            <li><strong>Move-in Date:</strong> ${moveInDate}</li>
            <li><strong>Rental Duration:</strong> ${rentalDuration} months</li>
          </ul>
          <p>Unfortunately, your request has not been approved by the landlord at this time. Please feel free to reach out to the landlord for further clarification.</p>
          <br>
          <p>Best regards,</p>
          <p>Basakhuji Team</p>
        `;
    }

    // Send the email notification
    await sendEmail({
        toEmail: tenantEmail,
        subject,
        text,
        html,
    });

    return result;
};



export const RentalRequestServices = {
  
    createRentalRequestToDB,
    getRentalRequestsByTenant,
    getRentalRequestsByLandlord,
    updatedRentalRequestStatusByLanload // 🔹 Export the new method
    
  };