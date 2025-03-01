import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { RiArrowRightLine } from 'react-icons/ri';


// Design examples - optimized with lazy loading
const designs = [
  {
    title: "Navigation Components",
    image: 'https://res.cloudinary.com/dwfzyshgd/image/upload/v1736420522/admin_codes/images/oudnpuitde4jrsugs0ju.png',
    description: "Modern navigation bars, sidebars, and menus with smooth animations."
  },
  {
    title: "Card Designs",
    image: 'https://res.cloudinary.com/dwfzyshgd/image/upload/v1736426162/admin_codes/images/vgzxahl8o7srfr6cupd1.png',
    description: "Beautiful card layouts for displaying content, products, or features."
  },
  {
    title: "Games",
    image: "https://res.cloudinary.com/dwfzyshgd/image/upload/v1736417907/admin_codes/images/nhwv531z5tsxrrms2rjb.png",
    description: "Explore interactive and engaging games with stunning visuals, immersive gameplay, and dynamic challenges."
  },
  {
    title: "Dashboard Layouts",
    image: "https://res.cloudinary.com/dwfzyshgd/image/upload/v1736477808/admin_codes/images/sziu0ydhflay1rfpb33r.png",
    description: "Complete dashboard templates with charts, tables, and widgets."
  }
];

const DesignCard = ({ design, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    
    if (!card || !image || !content) return;
    
    // Throttled mouse move handler
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
      const rotateX = (y - centerY) / 40; // Reduced rotation for better performance
      const rotateY = (centerX - x) / 40;
      
      // Apply rotation and highlight effect
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.25)',
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000
      });
      
      // Move image slightly for parallax effect
      gsap.to(image, {
        scale: 1.03, // Reduced scale for better performance
        x: (x - centerX) / 30,
        y: (y - centerY) / 30,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Move content in opposite direction for enhanced parallax
      gsap.to(content, {
        x: (centerX - x) / 40,
        y: (centerY - y) / 40,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.2)',
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.to(image, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.6,
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="design-card overflow-hidden rounded-lg backdrop-blur-md border border-white/20 shadow-lg shadow-space-accent/10 z-2 group"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="aspect-video overflow-hidden">
        <div 
          ref={imageRef}
          className="w-full h-full relative"
        >
          <img 
            src={design.image} 
            alt={design.title}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
      <div 
        ref={contentRef}
        className="p-6 relative"
      >
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-space-accent transition-colors duration-300">{design.title}</h3>
        <p className="text-space-text/90 group-hover:text-white transition-colors duration-300">{design.description}</p>
        
        {/* Reveal button on hover */}
        <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-500 ease-in-out">
          <Link 
            to={`/components/${design.title.toLowerCase().split(' ')[0]}`}
            className="inline-flex items-center gap-2 text-space-accent hover:text-space-highlight transition-colors"
          >
            <span>Explore {design.title}</span>
            <RiArrowRightLine className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const DesignsSection = ({ designsRef }) => {
  return (
    <section ref={designsRef} data-scroll-section className="py-24 relative backdrop-blur-sm">
      <div className="container mx-auto px-8 relative z-2">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Beautiful Designs</h2>
          <p className="text-xl text-space-text/80 max-w-2xl mx-auto">
            Explore our collection of space-themed UI components and templates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {designs.map((design, index) => (
            <DesignCard key={index} design={design} index={index} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            to="/components/navigation" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-space-accent text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-space-accent/20 z-2 hover:shadow-space-accent/40 hover:scale-105 active:scale-95"
          >
            View All Components
            <RiArrowRightLine className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
      
      {/* Simplified background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-space-highlight/5 blur-[150px] pointer-events-none"></div>
    </section>
  );
};

export default DesignsSection;