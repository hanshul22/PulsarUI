import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileImage from '../components/ProfileImage';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    image: null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfile({ ...profile, image: e.target.files[0] });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', profile);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 pt-24"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold gradient-text mb-6">Profile Settings</h2>
        <div className="glass-effect rounded-lg p-6">
          <ProfileImage 
            image={profile.image} 
            onImageChange={handleImageChange} 
          />
          <ProfileForm
            profile={profile}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;