import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileImage from '../../components/deskbordComponents/ProfileImage';
import ProfileForm from '../../components/deskbordComponents/ProfileForm';
import { useUserContext } from '../../services/Context';


const Profile = () => {
  const { user } = useUserContext();  
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    image: user?.image || null
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
      className="max-w-2xl p-6 mx-auto"
    >
      <h2 className="mb-6 text-3xl font-bold">Profile Settings</h2>
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
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
    </motion.div>
  );
};

export default Profile;