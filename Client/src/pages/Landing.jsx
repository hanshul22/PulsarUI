import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Import landing page components
import BackgroundEffects from '../components/landing/BackgroundEffects';
import LandingNav from '../components/landing/LandingNav';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import DesignsSection from '../components/landing/DesignsSection';
import FooterSection from '../components/landing/FooterSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Landing = () => {
  const mainRef = useRef(null);
  const scrollRef = useRef(null);
  const introRef = useRef(null);
  const featuresRef = useRef(null);
  const designsRef = useRef(null);
  const contactRef = useRef(null);
  const locomotiveScrollRef = useRef(null);
  
  // State to track active section
  const [activeSection, setActiveSection] = useState('home');

  // Scroll to section function - optimized with throttling
  const scrollToSection = (elementRef, section) => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(elementRef.current, {
        offset: -80, // Reduced offset for faster response
        duration: 600, // 40% faster than original 1000ms
        easing: [0.2, 0.0, 0.35, 1.0] // Optimized easing curve
      });
    }
    setActiveSection(section);
  };

  useEffect(() => {
    // Initialize Locomotive Scroll with optimized settings
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.2, // Faster scroll speed
      lerp: 0.1, // More responsive scrolling
      smartphone: {
        smooth: true,
        multiplier: 1.0
      },
      tablet: {
        smooth: true,
        multiplier: 1.1
      },
      // Reduce scroll lag by limiting the number of elements tracked
      getDirection: true,
      getSpeed: false, // Disable speed tracking for better performance
      reloadOnContextChange: false // Prevent unnecessary reloads
    });

    // Optimize scroll event handling with throttling
    let scrollTimeout;
    const throttledScrollHandler = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          ScrollTrigger.update();
          scrollTimeout = null;
        }, 100); // Throttle to once every 100ms
      }
    };

    // Update ScrollTrigger when locomotive scroll updates - with throttling
    locomotiveScrollRef.current.on('scroll', throttledScrollHandler);

    // Set up ScrollTrigger proxy for Locomotive Scroll - optimized
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length 
          ? locomotiveScrollRef.current.scrollTo(value, 0, 0) 
          : locomotiveScrollRef.current.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed"
    });

    // Optimize refresh events with debouncing
    const debouncedRefresh = () => {
      let refreshTimeout;
      return () => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
          locomotiveScrollRef.current.update();
        }, 200);
      };
    };

    // Each time the window updates, refresh ScrollTrigger and Locomotive Scroll - with debouncing
    ScrollTrigger.addEventListener('refresh', debouncedRefresh());
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Batch animations for better performance
      ScrollTrigger.batch('.feature-card', {
        interval: 0.05, // Time between batches
        batchMax: 3, // Maximum batch size
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out'
        }),
        start: 'top 85%',
        scroller: scrollRef.current
      });

      ScrollTrigger.batch('.design-card', {
        interval: 0.05,
        batchMax: 2,
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out'
        }),
        start: 'top 85%',
        scroller: scrollRef.current
      });

      // Optimize section triggers to use fewer markers and simpler callbacks
      const createSectionTrigger = (ref, sectionName) => {
        ScrollTrigger.create({
          trigger: ref.current,
          scroller: scrollRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveSection(sectionName),
          onEnterBack: () => setActiveSection(sectionName),
          markers: false // Disable markers for performance
        });
      };

      // Create optimized section triggers
      createSectionTrigger(introRef, 'home');
      createSectionTrigger(featuresRef, 'features');
      createSectionTrigger(designsRef, 'designs');
      createSectionTrigger(contactRef, 'contact');
    }, mainRef);

    // Optimize resize handling with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.update();
        }
        ScrollTrigger.refresh();
      }, 250); // Debounce resize events
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(scrollTimeout);
      
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden bg-transparent">
      {/* Background Effects */}
      <BackgroundEffects mainRef={mainRef} />
      
      {/* Navigation */}
      <LandingNav 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        introRef={introRef}
        featuresRef={featuresRef}
        designsRef={designsRef}
        contactRef={contactRef}
      />

      {/* Main content with Locomotive Scroll */}
      <div ref={scrollRef} data-scroll-container className="bg-transparent will-change-transform">
        {/* Hero Section */}
        <HeroSection introRef={introRef} />

        {/* Features Section */}
        <FeaturesSection featuresRef={featuresRef} />

        {/* Designs Section */}
        <DesignsSection designsRef={designsRef} />

        {/* Contact & Footer Section */}
        <FooterSection 
          contactRef={contactRef} 
          activeSection={activeSection} 
          scrollToSection={scrollToSection}
          introRef={introRef}
          featuresRef={featuresRef}
          designsRef={designsRef}
        />
      </div>
    </div>
  );
};

export default Landing;