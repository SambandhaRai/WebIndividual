import { Experience } from "../../model/index.js"; // Ensure the Experience model is correctly imported
import { sequelize } from "../../database/db.js"; // Sequelize instance for transaction handling
import cloudinary from "../../uploads/cloudinaryConfig.js"; // Cloudinary for image upload

// Get all experiences
export const getAll = async (req, res) => {
  try {
    const experiences = await Experience.findAll(); 
    res.status(200).json({ data: experiences, message: "Successfully fetched experiences" });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
};

// Create a new experience
export const create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { expName, expDetails } = req.body;

        if (!expName || !expDetails) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let imageUrl = null;
        let publicId = null;

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, { folder: "experience_images" });
                imageUrl = result.secure_url;
                publicId = result.public_id;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({ error: "Failed to upload image" });
            }
        }

        const experience = await Experience.create(
            { expName, expDetails, imageUrl, publicId },
            { transaction }
        );

        await transaction.commit();
        res.status(201).json({ message: "Experience created successfully", experience });
    } catch (error) {
        await transaction.rollback();
        console.error("Error creating experience:", error);
        res.status(500).json({ error: "Failed to create experience", details: error.message });
    }
};

// Fetch experience by ID
export const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" });
        }
        res.status(200).json({ experience });
    } catch (error) {
        console.error("Error fetching experience:", error);
        res.status(500).json({ error: "Failed to fetch experience" });
    }
};

export const updateExperience = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { expName, expDetails } = req.body;
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" });
        }

        let imageUrl = experience.imageUrl;
        let publicId = experience.publicId;

        if (req.file) {
            try {
                if (publicId) await cloudinary.uploader.destroy(publicId);
                const result = await cloudinary.uploader.upload(req.file.path, { folder: "experience_images" });
                imageUrl = result.secure_url;
                publicId = result.public_id;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({ error: "Failed to upload image" });
            }
        }

        await experience.update(
            { expName, expDetails, imageUrl, publicId },
            { transaction }
        );

        await transaction.commit();
        res.status(200).json({ message: "Experience updated successfully", experience });
    } catch (error) {
        await transaction.rollback();
        console.error("Error updating experience:", error);
        res.status(500).json({ error: "Failed to update experience" });
    }
};

// Delete an experience
export const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) return res.status(404).json({ error: "Experience not found" });

    if (experience.publicId) {
      try {
        await cloudinary.uploader.destroy(experience.publicId);
      } catch (deleteError) {
        console.error("Cloudinary delete error:", deleteError);
      }
    }

    await experience.destroy({ transaction });
    await transaction.commit();
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: "Failed to delete experience" });
  }
};

export const experienceController = { getAll, create, getExperienceById, updateExperience, deleteById };
