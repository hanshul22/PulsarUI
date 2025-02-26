import { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from './FileUpload';
import { RiSaveLine, RiCloseLine } from 'react-icons/ri';

const CodeEditForm = ({ code, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    ...code,
    image: code.image || null,
    video: code.video || null
  });

  const handleFileChange = (type, file) => {
    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 bg-space-dark/50 backdrop-blur-md rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Source Path</label>
          <select
            name="sourcePath"
            value={formData.sourcePath}
            onChange={(e) => setFormData(prev => ({ ...prev, sourcePath: e.target.value }))}
            className="w-full p-3 bg-space-dark/50 backdrop-blur-md rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
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
            onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
            className="w-full p-3 bg-space-dark/50 backdrop-blur-md rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-space-text">Deployed URL</label>
          <input
            type="url"
            name="deployedUrl"
            value={formData.deployedUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, deployedUrl: e.target.value }))}
            className="w-full p-3 bg-space-dark/50 backdrop-blur-md rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-space-text">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows="4"
          className="w-full p-3 bg-space-dark/50 backdrop-blur-md rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
          placeholder="Describe your code..."
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
              onChange={(e) => setFormData(prev => ({
                ...prev,
                code: { ...prev.code, [lang]: e.target.value }
              }))}
              rows="6"
              className="w-full p-3 bg-space-dark/50 backdrop-blur-md rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors font-mono text-sm"
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
          onClick={onCancel}
          className="px-6 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
        >
          <RiCloseLine size={20} />
          Cancel
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-space-accent to-space-highlight text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2"
        >
          <RiSaveLine size={20} />
          Save Changes
        </motion.button>
      </div>
    </motion.form>
  );
};

export default CodeEditForm;