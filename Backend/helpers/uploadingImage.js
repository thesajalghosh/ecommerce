const cloudinary = require("cloudinary");

const uploadingImage = async (path) => {
  const result = await cloudinary.v2.uploader.upload(path, {
    folder: "ecommerce", // Optional: Specify a folder in Cloudinary
    use_filename: true,
    unique_filename: false,
  });

  console.log(result);

  return result;
};

module.exports = { uploadingImage };
