export const contentVariants = {
  enter: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transform: 'translateX(-10%)',
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};