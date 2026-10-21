"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { MdSunny, MdOutlineNightlight, MdComputer } from "react-icons/md";
import { IconButton, type IconButtonProps } from "../ui/icon-button";
import { Tooltip } from "../ui/tooltip";

/**
 * reference:
 * https://github.com/pacocoursey/next-themes/tree/main?tab=readme-ov-file#avoid-hydration-mismatch
 */

function ColorModeHandler({ className, ...props }: IconButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { icon, next } = useMemo(() => {
    if (theme === "dark")
      return { icon: <MdOutlineNightlight />, next: "system" };
    if (theme === "light") return { icon: <MdSunny />, next: "dark" };
    return { icon: <MdComputer />, next: "light" };
  }, [theme]);
  const onClick = () => {
    setTheme(next);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip
      content={`Change to ${next} mode.`}
      openDelay={250}
      closeDelay={250}
      closeOnPointerDown
    >
      <IconButton
        className={className}
        variant="plain"
        onClick={onClick}
        aria-label={`Change to ${next} mode.`}
        {...props}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default ColorModeHandler;
