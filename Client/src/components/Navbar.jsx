import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  RiUserLine,
  RiSettings4Line,
  RiLogoutBoxLine,
  RiAddCircleLine,
  RiGalleryLine
} from 'react-icons/ri';
import MenuCheckbox from './MenuCheckbox';
import { selectUser, logoutUser } from '../store/slices/userSlice';
import toast from 'react-hot-toast';

const Navbar = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onMenuClick();
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 px-0 py-2 bg-space-dark/50 backdrop-blur-md border-b border-white/10">
      <div className="flex justify-between items-center h-14 px-4">
        <div className="flex items-center gap-2">
          <MenuCheckbox isOpen={isSidebarOpen} onToggle={handleMenuToggle} />
          
          <Link to="/" className="flex items-center gap-2">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold gradient-text"
            >
              Pulsar UI
            </motion.span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <motion.div className="flex gap-2">
            <NavButton icon={RiAddCircleLine} to="/create-post" text="Create Post" />
            <NavButton icon={RiGalleryLine} to="/posts" text="All Posts" />
          </motion.div>
          
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-space-accent transition-all bg-white/5 flex items-center justify-center"
            >
              {user?.image ? (
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-space-accent to-space-highlight flex items-center justify-center text-white">
                  {user?.name ? user.name[0].toUpperCase() : <RiUserLine />}
                </div>
              )}
            </motion.button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute right-0 mt-2 w-64 bg-space-dark/30 backdrop-blur-xl rounded-lg overflow-hidden shadow-xl border border-white/10"
                >
                  <div className="p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        {user?.image ? (
                          <img 
                            src={user.image} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-space-accent to-space-highlight flex items-center justify-center text-white text-xl">
                            {user?.name ? user.name[0].toUpperCase() : <RiUserLine />}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user?.name || 'Guest'}</p>
                        <p className="text-sm text-white/60">{user?.email || 'No email'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5">
                    <ProfileMenuItem 
                      icon={RiSettings4Line} 
                      text="Profile Settings" 
                      to="/profile" 
                    />
                    <ProfileMenuItem 
                      icon={RiLogoutBoxLine} 
                      text="Logout" 
                      onClick={handleLogout}
                      className="text-red-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ icon: Icon, to, text }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link 
      to={to} 
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      <Icon className="text-xl" />
      <span>{text}</span>
    </Link>
  </motion.div>
);

const ProfileMenuItem = ({ icon: Icon, text, to, onClick, className = '' }) => {
  const content = (
    <motion.div
      whileHover={{ x: 4 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon className="text-xl" />
      <span>{text}</span>
    </motion.div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};

export default Navbar;