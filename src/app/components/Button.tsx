// components/PremiumButton.tsx
"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  rounded = "none",
  icon,
  iconPosition = "left",
  className = "",
  onClick,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const controls = useAnimationControls();

  // Button variants
  const variants = {
    primary: {
      bg: "bg-primary",
      hover: "hover:bg-primary",
      text: "text-primary-foreground",
      shadow: "shadow-lg hover:shadow-primary/30",
      border: "border border-primary",
    },
    secondary: {
      bg: "bg-secondary",
      hover: "hover:bg-secondary",
      text: "text-secondary-foreground",
      shadow: "shadow-lg hover:shadow-secondary/30",
      border: "border border-secondary",
    },
    outline: {
      bg: "bg-transparent",
      hover: "hover:bg-primary/10",
      text: "text-primary",
      shadow: "shadow-sm hover:shadow-md",
      border: "border border-primary",
    },
    ghost: {
      bg: "bg-transparent",
      hover: "hover:bg-primary/10",
      text: "text-primary",
      shadow: "",
      border: "border border-transparent",
    },
  };

  // Size variants
  const sizes = {
    sm: "text-sm py-2 px-4",
    md: "text-md py-3 px-6",
    lg: "text-xl py-3 px-8",
  };

  // Border radius variants
  const radii = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
    none: "rounded-none",
  };

  // Handle interactions
  useEffect(() => {
    if (isPressed) {
      controls.start({
        scale: 0.98,
        transition: { duration: 0.1 },
      });
    } else if (isHovered) {
      controls.start({
        scale: 1.03,
        transition: { duration: 0.2 },
      });
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.2 },
      });
    }
  }, [isHovered, isPressed, controls]);

  return (
    <motion.button
      initial={false}
      animate={controls}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      className={`
        relative overflow-hidden
        group cursor-pointer
        font-medium tracking-wide
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${variants[variant].bg}
        ${variants[variant].hover}
        ${variants[variant].text}
        ${variants[variant].shadow}
        ${variants[variant].border}
        ${sizes[size]}
        ${radii[rounded]}
        ${className}
      `}
    >
      {/* Ripple effect */}
      {isPressed && (
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Subtle gradient overlay on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <div className="relative z-10 flex items-center justify-center gap-2 group">
        {icon && iconPosition === "left" && (
          <span className="inline-flex">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="inline-flex group-hover:-rotate-30 transition-transform ease-in-out duration-300">
            {icon}
          </span>
        )}
      </div>
    </motion.button>
  );
};

export default Button;
