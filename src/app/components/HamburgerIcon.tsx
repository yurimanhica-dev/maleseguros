import { motion } from "framer-motion";

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-6 h-6 relative flex flex-col justify-between items-start cursor-pointer hover:scale-105 transition-transform ease-in-out duration-700">
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
        className="w-full h-0.5 bg-primary rounded origin-center"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1 }}
        className="w-[70%] h-0.5 bg-primary rounded "
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
        className="w-full h-0.5 bg-primary rounded origin-center"
      />
    </div>
  );
};

export default HamburgerIcon;
