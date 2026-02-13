import * as React from "react";

const TooltipContext = React.createContext<any>(null);

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <TooltipContext.Provider value={{}}>{children}</TooltipContext.Provider>;
};

export const useTooltip = () => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within TooltipProvider");
  }
  return context;
};

export const Tooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { content?: React.ReactNode }
>(({ content, children, ...props }, ref) => (
  <div ref={ref} title={typeof content === "string" ? content : undefined} {...props}>
    {children}
  </div>
));

Tooltip.displayName = "Tooltip";
