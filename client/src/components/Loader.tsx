import { motion } from "framer-motion";

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: 'easeInOut',
};

const Loader = () => {
  return (
    <motion.div className="w-12 h-4 flex justify-between">
      <motion.span
        className="block w-2 h-2 bg-white rounded-full"
        variants={loadingCircleVariants}
        initial="start"
        animate="end"
        transition={loadingCircleTransition}
      />
      <motion.span
        className="block w-2 h-2 bg-white rounded-full"
        variants={loadingCircleVariants}
        initial="start"
        animate="end"
        transition={{ ...loadingCircleTransition, delay: 0.2 }}
      />
      <motion.span
        className="block w-2 h-2 bg-white rounded-full"
        variants={loadingCircleVariants}
        initial="start"
        animate="end"
        transition={{ ...loadingCircleTransition, delay: 0.4 }}
      />
    </motion.div>
  );
};

export default Loader;
