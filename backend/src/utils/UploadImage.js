import { v2 as cloudinary } from "cloudinary";

const UploadImage = (image, id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, { public_id: id }, function (er, result) {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      return reject(er);
    });
  });
};

export default UploadImage;
