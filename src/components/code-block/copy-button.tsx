"use client";

import { useEffect, useState, type ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CopyButtonProps extends ComponentProps<"button"> {
  content: string;
  iconSize?: number;
}

const CopyButton = ({
  content,
  iconSize = 14,
  className,
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
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
  };

  return (
    <button
      title="Copy to clipboard"
      className={cn(
        "cursor-pointer",
        "transition-colors duration-200 ease-in-out",
        "text-foreground/30",
        "hover:text-primary",
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      {isCopied ? (
        <CheckIcon
          size={iconSize}
          className="animate-in zoom-in-50 text-emerald-400 duration-200"
        />
      ) : (
        <CopyIcon
          size={iconSize}
          className="animate-in zoom-in-50 duration-200"
        />
      )}
    </button>
  );
};

export { CopyButton };
