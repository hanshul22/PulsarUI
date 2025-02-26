import { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from '../components/FileUpload';
import { useNavigate } from 'react-router-dom';
import { RiSaveLine, RiCloseLine } from 'react-icons/ri';

const CodeUploadForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if code fields are filled
    const { html, css, js } = formData.code;
    if (!html || !css || !js) {
      alert('Please fill in all code fields: HTML, CSS, and JS.');
      return;
    }

    // Add your form submission logic here
    navigate('/dashboard');
  };

  const handleFileChange = (type, file) => {
    setFormData(prev => ({ ...prev, [type]: file }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-8"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-space-text">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 transition-colors border rounded-lg outline-none bg-space-light border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-space-text">Source Path</label>
          <select
            name="sourcePath"
            value={formData.sourcePath}
            onChange={handleChange}
            className="w-full p-3 transition-colors border rounded-lg outline-none bg-space-light border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent"
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-space-text">Image</label>
          <FileUpload
            accept="image/*"
            onChange={(file) => handleFileChange('image', file)}
            preview={formData.image}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-space-text">Video</label>
          <FileUpload
            accept="video/*"
            onChange={(file) => handleFileChange('video', file)}
            preview={formData.video}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-space-text">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full p-3 transition-colors border rounded-lg outline-none bg-space-light border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-space-text">Deployed URL</label>
          <input
            type="url"
            name="deployedUrl"
            value={formData.deployedUrl}
            onChange={handleChange}
            className="w-full p-3 transition-colors border rounded-lg outline-none bg-space-light border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-space-text">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 transition-colors border rounded-lg outline-none bg-space-light border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent"
          placeholder="Describe your code..."
        />
      </div>

      <div className="space-y-6">
        {['html', 'css', 'js'].map((lang) => (
          <div key={lang}>
            <label className="block mb-2 text-sm font-medium text-space-text">
              {lang.toUpperCase()}
            </label>
            <textarea
              name={`code.${lang}`}
              value={formData.code[lang]}
              onChange={handleChange}
              rows="6"
              className="w-full p-3 font-mono text-sm transition-colors border rounded-lg outline-none bg-space-light border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent"
              placeholder={`Enter ${lang.toUpperCase()} code...`}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-6 py-2 transition-colors rounded-lg hover:bg-space-light"
        >
          <RiCloseLine size={20} />
          Cancel
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex items-center gap-2 px-6 py-2 text-white transition-colors rounded-lg bg-space-accent hover:bg-opacity-90"
        >
          <RiSaveLine size={20} />
          Save Code
        </motion.button>
      </div>
    </motion.form>
  );
};

export default CodeUploadForm;