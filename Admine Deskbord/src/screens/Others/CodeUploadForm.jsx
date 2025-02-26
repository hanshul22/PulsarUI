import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from '../../components/deskbordComponents/FileUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const CodeUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    sourcePath:'',
    description: '',
    image: null,
    video: null,
    githubUrl: '',
    deployedUrl: '',
    code: {
      html: '',
      css: '',
      js: ''
    }
  });

  const navigate = useNavigate();

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

  const onCancel = () => {
    navigate('/daskboard')
  }

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
        `http://localhost:500/api/admin/upload`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Code uploaded successfully");
      navigate('/daskboard')
    } catch (error) {
      console.error("Error uploading code:", error);
  
      // Log detailed response if available
      if (error.response) {
        console.error("Backend response:", error.response.data);
      }
  
      toast.error("Error uploading code");
    }
  };
  
  const handleFileChange = (type, file) => {
    setFormData((prev) => ({ ...prev, [type]: file }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-10 mx-auto pl-40 pr-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Source Path</label>
          <input
            type="text"
            name="sourcePath"
            value={formData.sourcePath}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <FileUpload
            accept="image/*"
            onChange={(file) => handleFileChange('image', file)}
            preview={formData.image}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Video</label>
          <FileUpload
            accept="video/*"
            onChange={(file) => handleFileChange('video', file)}
            preview={formData.video}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deployed URL</label>
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
        <label className="block text-sm font-medium mb-2">Description</label>
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
          <label className="block text-sm font-medium mb-2">HTML</label>
          <textarea
            name="code.html"
            value={formData.code.html}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 bg-gray-700 rounded-lg font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">CSS</label>
          <textarea
            name="code.css"
            value={formData.code.css}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 bg-gray-700 rounded-lg font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">JavaScript</label>
          <textarea
            name="code.js"
            value={formData.code.js}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 bg-gray-700 rounded-lg font-mono"
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
          Upload Code
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

export default CodeUploadForm;
