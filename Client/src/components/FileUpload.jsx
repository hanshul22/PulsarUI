import { motion } from 'framer-motion';
import { RiUploadCloud2Line, RiCloseLine } from 'react-icons/ri';

const FileUpload = ({ accept, onChange, preview }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  const clearFile = () => {
    onChange(null);
  };

  return (
    <div className="relative">
      {preview ? (
        <div className="relative aspect-video rounded-lg overflow-hidden glass-effect">
          {accept.includes('image') ? (
            <img
              src={preview instanceof File ? URL.createObjectURL(preview) : preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={preview instanceof File ? URL.createObjectURL(preview) : preview}
              className="w-full h-full object-cover"
              controls
            />
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearFile}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          >
            <RiCloseLine size={20} />
          </motion.button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-lg cursor-pointer glass-effect hover:bg-space-light/20 transition-colors border-2 border-dashed border-space-accent/30 hover:border-space-accent">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <RiUploadCloud2Line className="w-10 h-10 mb-3 text-space-accent" />
            <p className="mb-2 text-sm text-space-text">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-space-text/60">
              {accept.includes('image') ? 'PNG, JPG or GIF' : 'MP4, WebM or OGG'}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;