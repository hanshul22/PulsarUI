import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  RiGithubFill,
  RiTwitterFill,
  RiLinkedinFill,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

// Optimized social icon component
const SocialIcon = ({ icon: Icon, href }) => {
  const iconRef = useRef(null);
  
  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;
    
    const handleMouseEnter = () => {
      gsap.to(icon, {
        y: -5,
        scale: 1.2,
        color: '#6366F1',
        boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(icon, {
        y: 0,
        scale: 1,
        color: 'currentColor',
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    icon.addEventListener('mouseenter', handleMouseEnter);
    icon.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      icon.removeEventListener('mouseenter', handleMouseEnter);
      icon.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      ref={iconRef}
      className="p-3 rounded-full hover:bg-space-accent/10 transition-colors"
    >
      <Icon size={22} />
    </a>
  );
};

// Optimized contact item component
const ContactItem = ({ icon: Icon, children }) => {
  const itemRef = useRef(null);
  
  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;
    
    const handleMouseEnter = () => {
      gsap.to(item, {
        x: 5,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '0.5rem',
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(item, {
        x: 0,
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    item.addEventListener('mouseenter', handleMouseEnter);
    item.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      item.removeEventListener('mouseenter', handleMouseEnter);
      item.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <li 
      ref={itemRef}
      className="flex items-center gap-3 contact-item p-2 transition-all duration-300"
    >
      <div className="text-space-accent p-2 rounded-full bg-space-accent/10">
        <Icon className="text-space-accent" />
      </div>
      {children}
    </li>
  );
};

const FooterSection = ({ contactRef, activeSection, scrollToSection, introRef, featuresRef, designsRef }) => {
  return (
    <footer ref={contactRef} data-scroll-section className="pt-24 pb-8 relative">
      {/* Simplified animated stars background */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-8 relative z-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold gradient-text mb-6">Pulser UI</h2>
            <p className="text-space-text/80 mb-6 max-w-md">
              A space-themed component library that brings your applications to new frontiers with stunning components and smooth animations.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={RiGithubFill} href="https://github.com" />
              <SocialIcon icon={RiTwitterFill} href="https://twitter.com" />
              <SocialIcon icon={RiLinkedinFill} href="https://linkedin.com" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection(introRef, 'home')} 
                  className={`${activeSection === 'home' ? 'text-space-accent' : 'text-space-text/80 hover:text-space-accent'} transition-colors relative group`}
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-space-accent group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(featuresRef, 'features')} 
                  className={`${activeSection === 'features' ? 'text-space-accent' : 'text-space-text/80 hover:text-space-accent'} transition-colors relative group`}
                >
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-space-accent group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(designsRef, 'designs')} 
                  className={`${activeSection === 'designs' ? 'text-space-accent' : 'text-space-text/80 hover:text-space-accent'} transition-colors relative group`}
                >
                  Designs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-space-accent group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <Link to="/components/navigation" className="text-space-text/80 hover:text-space-accent transition-colors relative group">
                  Components
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-space-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <ContactItem icon={RiMailLine}>
                <a href="mailto:pulserui.team@gmail.com" className="text-space-text/80 hover:text-space-accent transition-colors">
                  pulserui.team@gmail.com
                </a>
              </ContactItem>
              <ContactItem icon={RiPhoneLine}>
                <span className="text-space-text/80">+1 (555) 123-4567</span>
              </ContactItem>
              <ContactItem icon={RiMapPinLine}>
                <span className="text-space-text/80">San Francisco, CA</span>
              </ContactItem>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-white/10 pt-8 text-center text-space-text/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>© 2025 Pulser UI. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;