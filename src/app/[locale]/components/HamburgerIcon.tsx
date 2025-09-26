import { motion } from "framer-motion";

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-8 h-5 relative flex flex-col justify-between items-end cursor-pointer">
      <motion.span
        animate={{
          rotate: isOpen ? 60 : 0,
          y: isOpen ? 8 : 0,
          width: isOpen ? "100%" : "100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-0.5 bg-primary rounded "
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
          width: isOpen ? "0%" : "85%",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full h-0.5 bg-primary rounded "
      />
      <motion.span
        animate={{
          rotate: isOpen ? -60 : 0,
          y: isOpen ? -8 : 0,
          width: isOpen ? "100%" : "70%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-0.5 bg-primary rounded "
      />
    </div>
  );
};

export default HamburgerIcon;
