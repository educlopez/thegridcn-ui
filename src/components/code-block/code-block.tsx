import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { FileIcon } from "@react-symbols/icons/utils";

const CodeBlock = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "not-prose",
        "flex w-full flex-col overflow-clip",
        "bg-black",
        "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type CodeBlockHeaderProps = ComponentProps<"div">;

const CodeBlockHeader = ({
  children,
  className,
  ...props
}: CodeBlockHeaderProps) => {
  return (
    <div
      className={cn(
        "not-prose",
        "flex h-9 items-center justify-between px-3 py-1.5",
        "border-b border-primary/15 bg-black/60",
        "text-sm text-foreground/40",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CodeBlockIconProps extends ComponentProps<"div"> {
  language?: string;
}

const CodeBlockIcon = ({ language, className }: CodeBlockIconProps) => {
  return (
    <FileIcon
      width={16}
      height={16}
      fileName={`.${language ?? ""}`}
      autoAssign={true}
      className={cn(className)}
    />
  );
};

type CodeBlockGroupProps = ComponentProps<"div">;

const CodeBlockGroup = ({
  children,
  className,
  ...props
}: CodeBlockGroupProps) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-2",
        "text-sm text-foreground/40",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CodeBlockContent = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "overflow-y-auto",
        "bg-black",
        "font-mono text-sm leading-5 whitespace-pre",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockIcon,
  CodeBlockGroup,
  CodeBlockContent,
};
