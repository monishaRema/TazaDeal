const baseURL = 'http://localhost:3000'
const siteTitle = "Taza Deal"

const motionContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const motionCardVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
    },
  },
};

export {baseURL, siteTitle, motionContainerVariants, motionCardVariants}