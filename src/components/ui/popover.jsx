
import React, { createContext, useContext, useState } from "react";
import { cn } from "../../lib/utils";

const PopoverContext = createContext({
  open: false,
  setOpen: () => {},
});

const Popover = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
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

const PopoverContent = ({ className, align = "center", children, ...props }) => {
  const { open } = useContext(PopoverContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded border bg-popover p-2 text-popover-foreground shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        {
          "absolute left-0 top-full mt-1": align === "start",
          "absolute left-1/2 top-full mt-1 -translate-x-1/2": align === "center",
          "absolute right-0 top-full mt-1": align === "end",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Popover, PopoverTrigger, PopoverContent };
