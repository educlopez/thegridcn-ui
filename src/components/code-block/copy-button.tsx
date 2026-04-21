"use client";

import { useEffect, useState, type ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps extends ComponentProps<"button"> {
  content: string;
  iconSize?: number;
  label?: string;
}

const CopyButton = ({
  content,
  iconSize = 14,
  className,
  label,
  ...props
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <button
      type="button"
      title={isCopied ? "Copied!" : "Copy to clipboard"}
      aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
      aria-live="polite"
      data-copied={isCopied}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-1.5 py-1",
        "cursor-pointer font-mono text-[10px] uppercase tracking-widest",
        "text-foreground/40 hover:text-primary",
        "transition-all duration-200 ease-in-out",
        "hover:bg-primary/5",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60",
        "data-[copied=true]:text-primary",
        "data-[copied=true]:shadow-[0_0_10px_var(--primary)]",
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      {isCopied ? (
        <Check
          size={iconSize}
          className="animate-in zoom-in-50 duration-200"
          aria-hidden="true"
        />
      ) : (
        <Copy
          size={iconSize}
          className="animate-in zoom-in-50 duration-200"
          aria-hidden="true"
        />
      )}
      {label ? <span>{isCopied ? "Copied" : label}</span> : null}
    </button>
  );
};

export { CopyButton };
