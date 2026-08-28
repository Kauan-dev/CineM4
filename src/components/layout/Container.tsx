import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div className={`mx-4.5 ${className}`} {...props}>
      {children}
    </div>
  );
}
