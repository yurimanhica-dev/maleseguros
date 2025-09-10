import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ThemedImage = ({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Durante a renderização do servidor, renderize um placeholder
    return (
      <div
        style={{ width, height }}
        className="bg-gray-200 animate-pulse rounded"
      />
    );
  }

  return (
    <Image
      src={resolvedTheme === "dark" ? darkSrc : lightSrc}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
