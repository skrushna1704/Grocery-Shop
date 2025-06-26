import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
export const uploadImage = async (file, folder = 'jumale-kirana') => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};

// Upload multiple images
export const uploadMultipleImages = async (files, folder = 'jumale-kirana') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple images upload error:', error);
    throw new Error('Multiple images upload failed');
  }
};

// Delete image from Cloudinary
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Image deletion failed');
  }
};

// Delete multiple images
export const deleteMultipleImages = async (publicIds) => {
  try {
    const deletePromises = publicIds.map(publicId => deleteImage(publicId));
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    console.error('Multiple images deletion error:', error);
    throw new Error('Multiple images deletion failed');
  }
};

// Generate image URL with transformations
export const generateImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    width: 400,
    height: 400,
    crop: 'fill',
    quality: 'auto:good',
    fetch_format: 'auto'
  };

  const transformOptions = { ...defaultOptions, ...options };
  
  return cloudinary.url(publicId, {
    transformation: [transformOptions]
  });
};

// Generate thumbnail URL
export const generateThumbnailUrl = (publicId, width = 150, height = 150) => {
  return generateImageUrl(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto:low'
  });
};

// Generate optimized image URL
export const generateOptimizedUrl = (publicId, width = 800, height = 600) => {
  return generateImageUrl(publicId, {
    width,
    height,
    crop: 'limit',
    quality: 'auto:good'
  });
};

// Check if image exists
export const checkImageExists = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return !!result;
  } catch (error) {
    return false;
  }
};

// Get image info
export const getImageInfo = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return {
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
      created_at: result.created_at
    };
  } catch (error) {
    console.error('Get image info error:', error);
    throw new Error('Failed to get image information');
  }
}; 