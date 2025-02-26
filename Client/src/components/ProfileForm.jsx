import { motion } from 'framer-motion';

const ProfileForm = ({ profile, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-space-text">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={onChange}
          className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-space-text">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={onChange}
          className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-space-text">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={profile.currentPassword}
          onChange={onChange}
          className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-space-text">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={profile.newPassword}
          onChange={onChange}
          className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-space-text">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={profile.confirmPassword}
          onChange={onChange}
          className="w-full p-3 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3 text-white bg-space-accent rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Save Changes
      </motion.button>
    </form>
  );
};

export default ProfileForm