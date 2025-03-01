import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Optimized mouse trail effect component
const MouseTrail = () => {
  const [trail, setTrail] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const maxTrailLength = 12; // Reduced from 20 for better performance
  const lastMoveTimeRef = useRef(0);
  const moveIntervalRef = useRef(30); // 30ms throttle

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastMoveTimeRef.current < moveIntervalRef.current) return;

      lastMoveTimeRef.current = currentTime;
      setIsActive(true);
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, id: Date.now() }];
        if (newTrail.length > maxTrailLength) {
          return newTrail.slice(newTrail.length - maxTrailLength);
        }
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            left: point.x,
            top: point.y,
            backgroundColor: `rgba(99, 102, 241, ${0.2 + (index / trail.length) * 0.5})`,
            filter: `blur(${3 - (index / trail.length) * 2}px)`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// Optimized nav link component
const NavLink = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`nav-link relative ${isActive ? 'text-space-accent' : 'text-space-text/80 hover:text-white'}`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeSection"
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-space-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
};

// Optimized nav button component
const NavButton = ({ children, to }) => {
  return (
    <Link
      to={to}
      className="btn-primary px-4 py-2 rounded-lg transition-all duration-300"
    >
      {children}
    </Link>
  );
};

const LandingNav = ({ activeSection, scrollToSection, introRef, featuresRef, designsRef, contactRef }) => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const leftNavRef = useRef()
  const rightNavRef = useRef()

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    if (leftNavRef.current) {
      gsap.from(leftNavRef.current.children, {
        x: -100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.inOut',
        duration: 0.6
      });
    }

  }, []);
  useGSAP(() => {
    if (rightNavRef.current) {
      gsap.from(rightNavRef.current.children, {
        x: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.inOut',
        duration: 0.6
      });
    }

  }, []);



  useEffect(() => {
    // Throttled scroll handler
    let lastScrollTime = 0;
    const scrollInterval = 100; // 100ms throttle

    const handleScroll = () => {
      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollInterval) return;

      lastScrollTime = currentTime;
      const scrollPosition = window.scrollY;

      if (scrollPosition > 50) {
        if (!scrolled) {
          setScrolled(true);
          gsap.to(navRef.current, {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      } else {
        if (scrolled) {
          setScrolled(false);
          gsap.to(navRef.current, {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            boxShadow: 'none',
            borderBottom: '1px solid rgba(255, 255, 255, 0)',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <MouseTrail />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-50 w-full px-8 py-4  bg-space-dark/50 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${scrolled ? 'glassmorphism-nav' : ''
          }`}
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold nav-logo gradient-text relative group">
              Pulser UI
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-space-accent to-space-highlight group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div className="flex gap-6 nav-left-items" ref={leftNavRef}>
              <NavLink
                isActive={activeSection === 'home'}
                onClick={() => scrollToSection(introRef, 'home')}
              >
                Home
              </NavLink>
              <NavLink
                isActive={activeSection === 'features'}
                onClick={() => scrollToSection(featuresRef, 'features')}
              >
                Features
              </NavLink>
              <NavLink
                isActive={activeSection === 'designs'}
                onClick={() => scrollToSection(designsRef, 'designs')}
              >
                Designs
              </NavLink>
              <NavLink
                isActive={activeSection === 'contact'}
                onClick={() => scrollToSection(contactRef, 'contact')}
              >
                Contact
              </NavLink>
            </div>
          </div>
          <div className="flex gap-4 nav-right-items" ref={rightNavRef}>
            <div>
              <NavButton to="/login"  >Login</NavButton>
            </div>
            <div>
              <NavButton to="/signup">Sign Up</NavButton>
            </div>
          </div>
        </div>

        {/* Animated glow effect */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-space-accent/30 to-transparent"></div>
      </nav>
    </>
  );
};

export default LandingNav;