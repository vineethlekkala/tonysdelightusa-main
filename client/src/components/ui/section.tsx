import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: boolean;
  background?: "white" | "gray" | "primary" | "dark";
}

export function Section({ 
  children, 
  className, 
  container = true, 
  background = "white",
  ...props 
}: SectionProps) {
  
  const bgColors = {
    white: "bg-background",
    gray: "bg-slate-50",
    primary: "bg-primary text-primary-foreground",
    dark: "bg-slate-900 text-slate-50",
  };

  return (
    <section 
      className={cn(
        "py-16 md:py-24",
        bgColors[background],
        className
      )} 
      {...props}
    >
      {container ? (
        <div className="container-custom">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
