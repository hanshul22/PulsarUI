import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  RiLayoutLine, 
  RiPaletteLine, 
  RiSpeedLine,
  RiCodeLine,
  RiShieldLine,
  RiThumbUpLine
} from 'react-icons/ri';

// Optimized features data
const features = [
  {
    icon: RiLayoutLine,
    title: "Responsive Layouts",
    description: "All components are fully responsive and work seamlessly across all device sizes."
  },
  {
    icon: RiPaletteLine,
    title: "Customizable Themes",
    description: "Easily customize colors, spacing, and other design elements to match your brand."
  },
  {
    icon: RiSpeedLine,
    title: "Performance Optimized",
    description: "Built with performance in mind, ensuring fast load times and smooth animations."
  },
  {
    icon: RiCodeLine,
    title: "Clean Code",
    description: "Well-structured, documented code that's easy to understand and modify."
  },
  {
    icon: RiShieldLine,
    title: "Accessibility First",
    description: "Components follow WCAG guidelines for maximum accessibility and usability."
  },
  {
    icon: RiThumbUpLine,
    title: "Regular Updates",
    description: "Continuous improvements and new components added based on community feedback."
  }
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  
  useEffect(() => {
    // Create hover effect with throttling
    const card = cardRef.current;
    const icon = iconRef.current;
    
    if (!card || !icon) return;
    
    let lastMoveTime = 0;
    const moveInterval = 50; // 50ms throttle
    
    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastMoveTime < moveInterval) return;
      
      lastMoveTime = currentTime;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30; // Reduced rotation for better performance
      const rotateY = (centerX - x) / 30;
      
      // Apply rotation and highlight effect
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        boxShadow: '0 15px 30px -15px rgba(99, 102, 241, 0.25)',
        scale: 1.01, // Reduced scale for better performance
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
      
      // Move icon slightly
      gsap.to(icon, {
        x: (x - centerX) / 15,
        y: (y - centerY) / 15,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 10px 30px -15px rgba(99, 102, 241, 0.2)',
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to(icon, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="feature-card p-8 rounded-lg border border-space-highlight/20 hover:border-space-highlight/40 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-space-accent/5 z-2 overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0.01) 100%)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        ref={iconRef}
        className="w-12 h-12 bg-space-highlight/30 rounded-lg flex items-center justify-center mb-4 shadow-inner shadow-space-highlight/20 transition-transform duration-300 group-hover:shadow-space-highlight/40"
      >
        <feature.icon className="text-space-highlight text-xl transition-all duration-300 group-hover:scale-125" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white transition-all duration-300 group-hover:text-space-highlight">{feature.title}</h3>
      <p className="text-space-text/90 leading-relaxed transition-all duration-300 group-hover:text-white">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = ({ featuresRef }) => {
  return (
    <section ref={featuresRef} data-scroll-section className="py-24 relative">
      <div className="container mx-auto px-8 relative z-2">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold gradient-text mb-4 relative inline-block">
            Powerful Features
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-space-accent to-space-highlight transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </h2>
          <p className="text-xl text-space-text/80 max-w-2xl mx-auto">
            Everything you need to build stunning web interfaces with minimal effort
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
      
      {/* Simplified background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-space-accent/5 blur-[150px] pointer-events-none"></div>
    </section>
  );
};

export default FeaturesSection;