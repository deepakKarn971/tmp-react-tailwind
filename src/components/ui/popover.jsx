
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

const PopoverContext = createContext({
  open: false,
  setOpen: () => {},
});

const Popover = ({ children }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block" ref={popoverRef}>{children}</div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ asChild, children, ...props }) => {
  const { open, setOpen } = useContext(PopoverContext);
  const Comp = asChild ? "div" : "button";

  return (
    <Comp onClick={() => setOpen(!open)} {...props}>
      {children}
    </Comp>
  );
};

const PopoverContent = ({ className, align = "center", sideOffset = 4, children, ...props }) => {
  const { open } = useContext(PopoverContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-white shadow-lg animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        {
          "absolute left-0 top-full mt-2": align === "start",
          "absolute left-1/2 top-full mt-2 -translate-x-1/2": align === "center",
          "absolute right-0 top-full mt-2": align === "end",
        },
        className
      )}
      style={{
        marginTop: sideOffset,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export { Popover, PopoverTrigger, PopoverContent };
