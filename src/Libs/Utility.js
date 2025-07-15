const baseURL = 'http://localhost:3000'
const siteTitle = "Taza Deal"

  const motionContainerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
        ease: "linear",
      },
    },
  };

  const motionCardVariants = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

export {baseURL, siteTitle, motionContainerVariants, motionCardVariants}