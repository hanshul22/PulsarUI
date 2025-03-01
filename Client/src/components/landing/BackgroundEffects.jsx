import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundEffects = ({ mainRef }) => {
  const starsCanvasRef = useRef(null);
  const nebulasRef = useRef(null);

  useEffect(() => {
    // Performance optimization: Use requestAnimationFrame with throttling
    let lastTime = 0;
    const fps = 30; // Limit to 30fps for background animations
    const fpsInterval = 1000 / fps;

    // Create canvas for stars with optimized rendering
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0';
    canvas.style.zIndex = '-5';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsCanvasRef.current = canvas;
    mainRef.current.appendChild(canvas);

    // Initialize stars with reduced count for better performance
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    const stars = [];
    // Reduce star count by 30% for better performance
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 2000);

    // Create stars with steady glow - simplified properties
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: 0.4 + Math.random() * 0.3,
        pulse: Math.random() * 0.1,
        pulseFactor: Math.random() * 0.08 + 0.04,
        color: Math.random() > 0.9 ? 
          `rgba(${99 + Math.random() * 30}, ${102 + Math.random() * 38}, ${241 + Math.random() * 14}, 1)` : 
          'rgba(255, 255, 255, 1)'
      });
    }

    // Create shooting stars - reduced count
    const shootingStars = [];
    const createShootingStar = () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * canvas.width * 0.5;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        length: 60 + Math.random() * 60,
        angle: angle + Math.PI,
        speed: 8 + Math.random() * 6,
        opacity: 0,
        active: false,
        delay: Math.random() * 60,
        color: Math.random() > 0.5 ? 
          `rgba(${99 + Math.random() * 30}, ${102 + Math.random() * 38}, ${241 + Math.random() * 14}, 1)` : 
          'rgba(255, 255, 255, 1)'
      };
    };

    // Reduce shooting star count
    for (let i = 0; i < 3; i++) {
      shootingStars.push(createShootingStar());
    }

    // Create nebulas with optimized container
    const nebulasContainer = document.createElement('div');
    nebulasContainer.className = 'absolute inset-0 overflow-hidden';
    nebulasContainer.style.zIndex = '-6';
    nebulasRef.current = nebulasContainer;
    mainRef.current.appendChild(nebulasContainer);

    const createNebula = (color1, color2, x, y, size, delay) => {
      const nebula = document.createElement('div');
      nebula.className = 'absolute rounded-full opacity-15 mix-blend-screen animate-nebula';
      nebula.style.background = `radial-gradient(circle, ${color1} 0%, ${color2} 70%, transparent 100%)`;
      nebula.style.width = `${size}px`;
      nebula.style.height = `${size}px`;
      nebula.style.left = `${x}%`;
      nebula.style.top = `${y}%`;
      nebula.style.transform = 'translate(-50%, -50%)';
      nebulasContainer.appendChild(nebula);

      // Optimize animation with reduced scale and longer duration
      gsap.to(nebula, {
        scale: 1.1,
        opacity: 0.12,
        duration: 20,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      return nebula;
    };

    // Create fewer nebulas with optimized sizes
    createNebula('rgba(99,102,241,0.3)', 'rgba(99,102,241,0.01)', 20, 30, 700, 0);
    createNebula('rgba(129,140,248,0.3)', 'rgba(129,140,248,0.01)', 80, 60, 800, 2);
    createNebula('rgba(168,85,247,0.2)', 'rgba(168,85,247,0.01)', 50, 80, 600, 4);

    // Create floating asteroids - reduced count and simplified
    const createAsteroid = (size, delay) => {
      const asteroid = document.createElement('div');
      asteroid.className = `asteroid absolute`;
      asteroid.style.zIndex = '-4';
      
      // Randomize asteroid shape
      const irregularity = Math.random() * 0.3 + 0.7;
      const borderRadius = `${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}%`;
      
      asteroid.style.width = `${size}px`;
      asteroid.style.height = `${size * irregularity}px`;
      asteroid.style.left = `${Math.random() * 100}%`;
      asteroid.style.top = `${Math.random() * 100}%`;
      asteroid.style.borderRadius = borderRadius;
      
      // Simplified asteroid texture
      const hue = Math.random() * 20 + 220;
      const saturation = Math.random() * 20 + 60;
      const lightness = Math.random() * 15 + 20;
      
      asteroid.style.background = `
        radial-gradient(
          circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
          hsla(${hue}, ${saturation}%, ${lightness + 15}%, 0.5) 0%, 
          hsla(${hue}, ${saturation - 10}%, ${lightness}%, 0.3) 80%, 
          transparent 100%
        )
      `;
      
      mainRef.current.appendChild(asteroid);

      // Optimize movement with longer durations and simpler patterns
      gsap.to(asteroid, {
        x: `random(-${window.innerWidth * 0.15}, ${window.innerWidth * 0.15})`,
        y: `random(-${window.innerHeight * 0.15}, ${window.innerHeight * 0.15})`,
        rotation: `random(-${180}, ${180})`,
        duration: Math.random() * 30 + 25,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      
      // Simplified pulsing effect
      gsap.to(asteroid, {
        scale: 0.9 + Math.random() * 0.2,
        opacity: 0.7 + Math.random() * 0.2,
        duration: Math.random() * 8 + 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      return asteroid;
    };

    // Create fewer asteroids
    for (let i = 0; i < 10; i++) {
      createAsteroid(10 + Math.random() * 30, i * 0.4);
    }
    
    // Create space dust particles - reduced count
    const createSpaceDust = () => {
      const dust = document.createElement('div');
      dust.className = 'space-dust';
      dust.style.zIndex = '-4';
      dust.style.left = `${Math.random() * 100}%`;
      dust.style.top = `${Math.random() * 100}%`;
      dust.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      dust.style.width = `${Math.random() * 1.5 + 0.5}px`;
      dust.style.height = `${Math.random() * 1.5 + 0.5}px`;
      
      // Simplified dust color
      const hue = Math.random() * 60 + 200;
      dust.style.backgroundColor = `hsla(${hue}, 70%, 85%, 0.5)`;
      
      mainRef.current.appendChild(dust);
      
      // Optimize animation with longer duration
      gsap.to(dust, {
        y: `-=${Math.random() * 120 + 80}`,
        x: `${Math.random() * 40 - 20}`,
        opacity: 0,
        duration: Math.random() * 25 + 20,
        ease: "power1.out",
        onComplete: () => {
          dust.remove();
          createSpaceDust();
        }
      });
    };
    
    // Create fewer space dust particles
    for (let i = 0; i < 20; i++) {
      createSpaceDust();
    }

    // Animation loop for stars with throttling for better performance
    let animationFrameId;
    let time = 0;
    
    const animateStars = (currentTime) => {
      animationFrameId = requestAnimationFrame(animateStars);
      
      // Throttle rendering for better performance
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      
      lastTime = currentTime - (elapsed % fpsInterval);
      time += 0.01;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with optimized rendering
      stars.forEach(star => {
        // Calculate pulsing opacity
        const pulsingOpacity = star.opacity + Math.sin(time + star.pulse) * star.pulseFactor;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace('1)', `${pulsingOpacity})`);
        ctx.fill();
        
        // Simplified glow effect
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 1.5, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, star.y, star.radius * 0.5,
            star.x, star.y, star.radius * 1.5
          );
          gradient.addColorStop(0, star.color.replace('1)', `${pulsingOpacity * 0.3})`));
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
      
      // Draw shooting stars with optimized rendering
      shootingStars.forEach(star => {
        if (star.delay > 0) {
          star.delay--;
          return;
        }
        
        if (!star.active && Math.random() < 0.002) {
          star.active = true;
          star.opacity = 0;
          
          // Reset position
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * canvas.width * 0.5;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          star.x = centerX + Math.cos(angle) * distance;
          star.y = centerY + Math.sin(angle) * distance;
          star.angle = angle + Math.PI;
        }
        
        if (star.active) {
          // Draw shooting star with optimized rendering
          const tailX = star.x - Math.cos(star.angle) * star.length;
          const tailY = star.y - Math.sin(star.angle) * star.length;
          
          const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
          gradient.addColorStop(0, star.color.replace('1)', `${star.opacity})`));
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Move shooting star
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          
          // Fade in/out
          if (star.opacity < 0.7) {
            star.opacity += 0.08;
          }
          
          // Check if out of bounds
          if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
            star.active = false;
            star.delay = Math.floor(Math.random() * 150) + 80;
          }
        }
      });
    };
    
    // Start animation with requestAnimationFrame
    animationFrameId = requestAnimationFrame(animateStars);

    // Handle window resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reposition stars
        stars.forEach(star => {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        });
      }, 250);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      
      // Remove all created elements
      if (starsCanvasRef.current) {
        starsCanvasRef.current.remove();
      }
      if (nebulasRef.current) {
        nebulasRef.current.remove();
      }
      
      const asteroids = document.querySelectorAll('.asteroid');
      const spaceDust = document.querySelectorAll('.space-dust');
      
      asteroids.forEach(asteroid => asteroid.remove());
      spaceDust.forEach(dust => dust.remove());
      
      // Kill all GSAP animations
      gsap.killTweensOf("*");
    };
  }, [mainRef]);

  return (
    <>
      {/* Base background gradient - optimized with fewer layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]" style={{ zIndex: '-8' }}></div>
      
      {/* Animated glow orbs - reduced count and simplified */}
      <div className="absolute w-[30rem] h-[30rem] rounded-full top-1/4 left-1/4 bg-space-accent/10 blur-[120px] animate-pulse-slow" style={{ zIndex: '-3' }}></div>
      <div className="absolute w-[35rem] h-[35rem] rounded-full bottom-1/4 right-1/4 bg-space-highlight/10 blur-[150px] animate-pulse" style={{ zIndex: '-3' }}></div>
    </>
  );
};

export default BackgroundEffects;