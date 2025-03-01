import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Import landing page components
import BackgroundEffects from './BackgroundEffects';
import LandingNav from './LandingNav';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import DesignsSection from './DesignsSection';
import FooterSection from './FooterSection';

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

  // Scroll to section function - optimized
  const scrollToSection = (elementRef, section) => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(elementRef.current, {
        offset: -100,
        duration: 800, // Faster scroll for better responsiveness
        easing: [0.25, 0.0, 0.35, 1.0]
      });
    }
    setActiveSection(section);
  };

  useEffect(() => {
    // Initialize Locomotive Scroll with optimized settings
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.8, // Reduced multiplier for smoother scrolling
      lerp: 0.08, // Increased lerp for smoother transitions
      smartphone: {
        smooth: true,
        multiplier: 0.6 // Even smoother on mobile
      },
      tablet: {
        smooth: true,
        multiplier: 0.7
      }
    });

    // Update ScrollTrigger when locomotive scroll updates
    locomotiveScrollRef.current.on('scroll', ScrollTrigger.update);

    // Set up ScrollTrigger proxy for Locomotive Scroll
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

    // Each time the window updates, refresh ScrollTrigger and Locomotive Scroll
    ScrollTrigger.addEventListener('refresh', () => locomotiveScrollRef.current.update());
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Navbar animations - simplified for better performance
      const navTimeline = gsap.timeline();
      navTimeline
        .from('.nav-logo', {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: 'back.out(1.5)'
        })
        .from('.nav-left-items > *', {
          opacity: 0,
          x: -50,
          stagger: 0.08,
          ease: 'power2.out'
        }, '-=0.4')
        .from('.nav-right-items > *', {
          opacity: 0,
          x: 50,
          stagger: 0.08,
          ease: 'power2.out'
        }, '-=0.4');

      // Heading animations - simplified
      const headingTimeline = gsap.timeline();
      headingTimeline
        .from('.hero-title', {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out'
        })
        .from('.hero-description', {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.3')
        .from('.hero-buttons', {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out'
        }, '-=0.2')
        .from('.astronaut-image', {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: 'back.out(1.5)'
        }, '-=0.6');

      // Features section animations - optimized
      gsap.from('.feature-card', {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          scroller: scrollRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Designs section animations - optimized
      gsap.from('.design-card', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: designsRef.current,
          scroller: scrollRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Contact section animations - optimized
      gsap.from('.contact-item', {
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          scroller: scrollRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Set up scroll triggers for active section detection - optimized
      ScrollTrigger.create({
        trigger: introRef.current,
        scroller: scrollRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection('home'),
        onEnterBack: () => setActiveSection('home')
      });

      ScrollTrigger.create({
        trigger: featuresRef.current,
        scroller: scrollRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection('features'),
        onEnterBack: () => setActiveSection('features')
      });

      ScrollTrigger.create({
        trigger: designsRef.current,
        scroller: scrollRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection('designs'),
        onEnterBack: () => setActiveSection('designs')
      });

      ScrollTrigger.create({
        trigger: contactRef.current,
        scroller: scrollRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection('contact'),
        onEnterBack: () => setActiveSection('contact')
      });
    }, mainRef);

    // Cleanup function
    return () => {
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
      <div ref={scrollRef} data-scroll-container className="bg-transparent">
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