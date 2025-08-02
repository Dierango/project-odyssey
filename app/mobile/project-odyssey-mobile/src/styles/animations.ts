// Animation configurations for consistent usage across the app
export const animations = {
  // Message animations
  messageSlideIn: {
    animation: 'slideInLeft' as const,
    duration: 400,
  },
  
  messageSlideInRight: {
    animation: 'slideInRight' as const,
    duration: 400,
  },
  
  messageFadeIn: {
    animation: 'fadeInUp' as const,
    duration: 300,
  },
  
  // Typing indicator animations
  typingPulse: {
    animation: 'pulse' as const,
    iterationCount: 'infinite' as const,
    duration: 1000,
  },
  
  // Header animations
  headerFadeIn: {
    animation: 'fadeInDown' as const,
    duration: 600,
  },
  
  // Input animations
  inputSlideUp: {
    animation: 'slideInUp' as const,
    duration: 600,
  },
  
  // Button animations
  buttonPulse: {
    animation: 'pulse' as const,
    iterationCount: 'infinite' as const,
    duration: 1000,
  },
  
  // Generic animations
  fadeIn: {
    animation: 'fadeIn' as const,
    duration: 300,
  },
  
  slideInRight: {
    animation: 'slideInRight' as const,
    duration: 400,
  },
  
  bounceIn: {
    animation: 'bounceIn' as const,
    duration: 600,
  },
};
