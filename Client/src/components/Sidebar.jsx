import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiCompass3Line,
  RiLoginCircleLine,
  RiLayout4Line,
  RiCheckboxBlankCircleLine,
  RiSlideshow3Line,
  RiStackLine,
  RiGamepadLine,
  RiErrorWarningLine
} from 'react-icons/ri';

const componentItems = [
  { name: 'Navigation Menu', icon: RiCompass3Line, path: '/components/navigation' },
  { name: 'Buttons', icon: RiCheckboxBlankCircleLine, path: '/components/buttons' },
  { name: 'Sliders', icon: RiSlideshow3Line, path: '/components/sliders' },
  { name: 'Cards', icon: RiStackLine, path: '/components/cards' },
];

const pageItems = [
  { name: 'Login Pages', icon: RiLoginCircleLine, path: '/components/login' },
  { name: 'Landing Pages', icon: RiLayout4Line, path: '/components/landing' },
  { name: 'Games', icon: RiGamepadLine, path: '/components/games' },
  { name: '404 Error Page', icon: RiErrorWarningLine, path: '/components/404' },
];

const Sidebar = ({ isOpen }) => {
  const sidebarVariants = {
    open: { 
      x: 0,
      width: "16rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    closed: { 
      x: "-100%",
      width: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.aside
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40 bg-space-dark/50 backdrop-blur-md border-r border-white/10"
    >
      <div className="p-4 space-y-6">
        {/* Components Section */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold gradient-text px-4">
            Components
          </h2>
          <nav className="space-y-1">
            {componentItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-space-accent to-space-highlight text-white' 
                      : 'hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="text-xl" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Pages Section */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold gradient-text px-4">
            Pages
          </h2>
          <nav className="space-y-1">
            {pageItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-space-accent to-space-highlight text-white' 
                      : 'hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="text-xl" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;