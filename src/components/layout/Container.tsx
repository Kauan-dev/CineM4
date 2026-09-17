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
    <div className={`mx-3.5 lg:mx-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
