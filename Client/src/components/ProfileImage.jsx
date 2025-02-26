import { motion } from 'framer-motion';
import { RiCameraLine } from 'react-icons/ri';

const ProfileImage = ({ image, onImageChange }) => {
  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div className="w-full h-full rounded-full bg-space-light flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">👤</span>
        )}
      </div>
      <label className="absolute bottom-0 right-0 bg-space-accent p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition-colors">
        <RiCameraLine className="text-white" />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
        />
      </label>
    </div>
  );
};

export default ProfileImage;