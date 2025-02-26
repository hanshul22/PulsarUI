import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RiSaveLine, RiCloseLine } from 'react-icons/ri';
import FileUpload from '../components/FileUpload';
import { createUserCode } from '../store/slices/codesSlice';
import { selectToken } from '../store/slices/userSlice';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const [formData, setFormData] = useState({
    title: '',
    sourcePath: '',
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
      const formDataObj = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && key !== 'video' && key !== 'code') {
          formDataObj.append(key, formData[key]);
        }
      });

      // Append code fields
      Object.keys(formData.code).forEach(key => {
        formDataObj.append(`code[${key}]`, formData.code[key]);
      });

      // Append files if they exist
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }
      if (formData.video) {
        formDataObj.append('video', formData.video);
      }

      await dispatch(createUserCode({ formData: formDataObj, token })).unwrap();
      navigate('/posts');
    } catch (error) {
      toast.error(error.message || 'Failed to create post');
    }
  };

  const handleFileChange = (type, file) => {
    setFormData(prev => ({ ...prev, [type]: file }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 space-y-8 pt-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
            placeholder="Enter title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Source Path</label>
          <select
            name="sourcePath"
            value={formData.sourcePath}
            onChange={handleChange}
            className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
            required
          >
            <option value="">Select type</option>
            <option value="navigation_design">Navigation</option>
            <option value="login_design">Login</option>
            <option value="landing_design">Landing</option>
            <option value="button_design">Buttons</option>
            <option value="slider_design">Sliders</option>
            <option value="card_design">Cards</option>
            <option value="games_design">Games</option>
            <option value="pagenotfound_design">404 Pages</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Image</label>
          <FileUpload
            accept="image/*"
            onChange={(file) => handleFileChange('image', file)}
            preview={formData.image}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Video</label>
          <FileUpload
            accept="video/*"
            onChange={(file) => handleFileChange('video', file)}
            preview={formData.video}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
            placeholder="https://github.com/..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Deployed URL</label>
          <input
            type="url"
            name="deployedUrl"
            value={formData.deployedUrl}
            onChange={handleChange}
            className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-space-text">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
          placeholder="Describe your code..."
          required
        />
      </div>

      <div className="space-y-6">
        {['html', 'css', 'js'].map((lang) => (
          <div key={lang}>
            <label className="block text-sm font-medium mb-2 text-space-text">
              {lang.toUpperCase()}
            </label>
            <textarea
              name={`code.${lang}`}
              value={formData.code[lang]}
              onChange={handleChange}
              rows="6"
              className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors font-mono text-sm"
              placeholder={`Enter ${lang.toUpperCase()} code...`}
              required
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => navigate('/posts')}
          className="px-6 py-2 rounded-lg hover:bg-space-light transition-colors flex items-center gap-2"
        >
          <RiCloseLine size={20} />
          Cancel
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-2 bg-space-accent text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
        >
          <RiSaveLine size={20} />
          Save Post
        </motion.button>
      </div>
    </motion.form>
  );
};

export default CreatePost;