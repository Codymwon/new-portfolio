'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // Displacement in pixels
  blur?: boolean;
  threshold?: number;
  once?: boolean;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  id,
  className = '',
  delay = 0,
  duration = 650,
  direction = 'up',
  distance = 20,
  blur = true,
  threshold = 0.1,
  once = true,
  as: Component = 'div',
  style: propStyle,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately without animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Compute transform offset
  let transformHidden = 'translate3d(0, 0, 0)';
  if (direction === 'up') transformHidden = `translate3d(0, ${distance}px, 0)`;
  else if (direction === 'down') transformHidden = `translate3d(0, -${distance}px, 0)`;
  else if (direction === 'left') transformHidden = `translate3d(${distance}px, 0, 0)`;
  else if (direction === 'right') transformHidden = `translate3d(-${distance}px, 0, 0)`;

  const computedStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : transformHidden,
    filter: blur ? (isVisible ? 'blur(0px)' : 'blur(4px)') : undefined,
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isVisible ? 'auto' : 'opacity, transform, filter',
    ...propStyle,
  };

  return (
    <Component id={id} ref={elementRef} className={className} style={computedStyle}>
      {children}
    </Component>
  );
}
