import { successResponse, errorResponse } from '../utils/helpers.js';
import { uploadImage, uploadMultipleImages as cloudinaryUploadMultipleImages, deleteImage } from '../utils/cloudinaryService.js';

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private
export const uploadSingleImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('Please upload an image'));
    }

    const folder = req.body.folder || 'general';
    const result = await uploadImage(req.file, folder);

    res.json(successResponse('Image uploaded successfully', {
      image: {
        public_id: result.public_id,
        url: result.url,
        width: result.width,
        height: result.height,
        format: result.format
      }
    }));
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private
export const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json(errorResponse('Please upload at least one image'));
    }

    const folder = req.body.folder || 'general';
    const results = await cloudinaryUploadMultipleImages(req.files, folder);

    const images = results.map(result => ({
      public_id: result.public_id,
      url: result.url,
      width: result.width,
      height: result.height,
      format: result.format
    }));

    res.json(successResponse('Images uploaded successfully', { images }));
  } catch (error) {
    next(error);
  }
};

// @desc    Delete image
// @route   DELETE /api/upload/image/:publicId
// @access  Private
export const deleteUploadedImage = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json(errorResponse('Public ID is required'));
    }

    await deleteImage(publicId);

    res.json(successResponse('Image deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get upload statistics
// @route   GET /api/upload/stats
// @access  Private/Admin
export const getUploadStats = async (req, res, next) => {
  try {
    // This would typically fetch from a database or Cloudinary API
    const stats = {
      totalUploads: 0,
      totalSize: 0,
      imagesUploaded: 0,
      lastUpload: null
    };

    res.json(successResponse('Upload statistics retrieved', { stats }));
  } catch (error) {
    next(error);
  }
}; 