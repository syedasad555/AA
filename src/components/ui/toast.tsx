import * as React from "react";

export type ToastActionElement = React.ReactElement<any>;

export interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, action, open, onOpenChange, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {title && <div>{title}</div>}
        {description && <div>{description}</div>}
        {action && <div>{action}</div>}
      </div>
    );
  }
);

Toast.displayName = "Toast";
