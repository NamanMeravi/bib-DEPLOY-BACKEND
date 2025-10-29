import { cloudinary } from "../configs/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    const downloadUrl = cloudinary.url(result.public_id, {
      resource_type: result.resource_type,
      flags: "attachment",
    });

    return {
      url: result.secure_url,
      downloadUrl,
      publicId: result.public_id,
      format: result.format, //jpg
      resource_type: result.resource_type, //image
      original_filename: result.original_filename, //fileName
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error while file uploading to cloudinary");
  }
};

export { uploadToCloudinary };
