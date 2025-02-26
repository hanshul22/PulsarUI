const UserCode = require("../model/UserCodes");

const uploadUserCode = async (req, res) => {
  try {
    // Destructure "code" from req.body (not html/css/js)
    const { 
      title, 
      description, 
      githubUrl, 
      deployedUrl, 
      sourcePath, 
      code // 👈 This contains { html, css, js }
    } = req.body;

    console.log(req.body);
    

    const image = req.files?.image?.[0]?.path || null;
    const video = req.files?.video?.[0]?.path || null;

    // Assign the entire "code" object to the model
    const newCode = new UserCode({
      title,
      description,
      image,
      video,
      githubUrl,
      deployedUrl,
      author: req.user.name,
      author_ID: req.user._id,
      sourcePath,
      code, // 👈 Directly use the extracted "code" object
    });

    await newCode.save();
    res.status(201).send("Data uploaded successfully");
  } catch (error) {
    console.log("Error in upload:", error);
    res.status(500).send("Failed to upload data");
  }
};

const getUserCodes = async (req, res) => {
    try {
        const codes = await UserCode.find();
        res.status(200).json(codes);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Failed to fetch data");
    }
};

const editUserCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, githubUrl, deployedUrl, sourcePath, html, css, js } = req.body;

    const existingCode = await UserCode.findById(id);
    if (!existingCode) {
      return res.status(404).json({ message: "Code not found" });
    }

    // Prepare updated data
    const updateData = {
      title,
      description,
      githubUrl,
      deployedUrl,
      sourcePath,
      code: { html, css, js },
    };

    // Handle new image upload
    if (req.files?.image?.[0]?.path) {
      if (existingCode.image) {
        console.log("Deleting old image:", existingCode.image);
        // Delete old image logic (Cloudinary/Local)
      }
      updateData.image = req.files.image[0].path;
    }

    // Handle new video upload
    if (req.files?.video?.[0]?.path) {
      if (existingCode.video) {
        console.log("Deleting old video:", existingCode.video);
        // Delete old video logic (Cloudinary/Local)
      }
      updateData.video = req.files.video[0].path;
    }

    // Update the document
    const updatedCode = await UserCode.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCode) {
      return res.status(404).json({ message: "Code not found" });
    }

    res.status(200).json(updatedCode);
  } catch (error) {
    // Better logging for debugging
    console.error("Error updating data:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Failed to update data", error: error.message });
  }
};


const deleteUserCode = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCode = await UserCode.findByIdAndDelete(id);

        if (!deletedCode) {
            return res.status(404).send("Code not found");
        }

        res.status(200).send("Code deleted successfully");
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send("Failed to delete data");
    }
};

module.exports = { uploadUserCode, getUserCodes, editUserCode, deleteUserCode };
