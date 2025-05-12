'use client'

import { ArrowRight } from "lucide-react";

interface ContextLinkProps {
  targetId: string;
  label: string;
  className?: string;
}

export function ContextLink({ targetId, label, className = "" }: ContextLinkProps) {
  const handleClick = () => {
    const element = document.querySelector(`#${targetId}`);
    if (element) {
      // Scroll with offset to account for sticky header
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      // Scroll to element with offset
      window.scrollTo({
        top: elementPosition - headerHeight - 250, // Extra 20px padding
        behavior: 'smooth'
      });
      
      // Add a temporary highlight effect
      element.classList.add('highlight-pulse');
      setTimeout(() => {
        element.classList.remove('highlight-pulse');
      }, 100000);
    } else {
      // Fallback to normal navigation
      window.location.href = `#${targetId}`;
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      className={`text-primary hover:underline flex items-center gap-1 ${className}`}
    >
      <span>{label}</span>
      <ArrowRight className="h-3 w-3" />
    </button>
  );
} 