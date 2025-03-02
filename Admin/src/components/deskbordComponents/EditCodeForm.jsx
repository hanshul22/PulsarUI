  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import FileUpload from './FileUpload';
  import axios from 'axios';
  import { toast } from 'react-toastify';

  const EditCodeForm = ({ code, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      title: code.title,
      description: code.description,
      image: code.image,
      video: code.video,
      githubUrl: code.githubUrl,
      deployedUrl: code.deployedUrl,
      sourcePath: code.sourcePath || "",
      code: {
        html: code.code?.html,
        css: code.code?.css,
        js: code.code?.js
      }
    });

    console.log(formData);
    

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: { ...prev[parent], [child]: value }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const token = localStorage.getItem("token");
        const formDataObj = new FormData();
    
        // Append form fields
        formDataObj.append("title", formData.title);
        formDataObj.append("sourcePath", formData.sourcePath);
        formDataObj.append("description", formData.description);
        formDataObj.append("githubUrl", formData.githubUrl);
        formDataObj.append("deployedUrl", formData.deployedUrl);
        formDataObj.append("html", formData.code.html);
        formDataObj.append("css", formData.code.css);
        formDataObj.append("js", formData.code.js);
    
        // Append files if they exist
        if (formData.image instanceof File) {
          formDataObj.append("image", formData.image);
        }
    
        if (formData.video instanceof File) {
          formDataObj.append("video", formData.video);
        }
    
        // Send request
        const response = await axios.post(
          `https://pulsarui-szzd.onrender.com/api/admin/edit/${code._id}`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        toast.success("Code updated successfully");
        onSubmit(response.data); // Notify parent about the update
      } catch (error) {
        console.error("Error updating code:", error);
    
        // Log detailed response if available
        if (error.response) {
          console.error("Backend response:", error.response.data);
        }
    
        toast.error("Error updating code");
      }
    };
    
    
    const handleFileChange = (type, file) => {
      setFormData((prev) => ({ ...prev, [type]: file }));
    };
    

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Source Path</label>
            <input
              type="text"
              name="sourcePath"
              value={formData.sourcePath}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium">Image</label>
            <FileUpload
              accept="image/*"
              onChange={(file) => handleFileChange('image', file)}
              preview={formData.image}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Video</label>
            <FileUpload
              accept="video/*"
              onChange={(file) => handleFileChange('video', file)}
              preview={formData.video}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium">GitHub URL</label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Deployed URL</label>
            <input
              type="url"
              name="deployedUrl"
              value={formData.deployedUrl}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">HTML</label>
            <textarea
              name="code.html"
              value={formData.code.html}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 font-mono bg-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">CSS</label>
            <textarea
              name="code.css"
              value={formData.code.css}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 font-mono bg-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">JavaScript</label>
            <textarea
              name="code.js"
              value={formData.code.js}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 font-mono bg-gray-700 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    );
  };

  export default EditCodeForm;