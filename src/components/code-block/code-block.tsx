import { FileIcon } from "@react-symbols/icons/utils";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const CodeBlock = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "not-prose",
      "flex w-full flex-col overflow-clip",
      "bg-black",
      "text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

type CodeBlockHeaderProps = ComponentProps<"div">;

const CodeBlockHeader = ({
  children,
  className,
  ...props
}: CodeBlockHeaderProps) => (
  <div
    className={cn(
      "not-prose",
      "flex h-9 items-center justify-between px-3 py-1.5",
      "border-primary/15 border-b bg-black/60",
      "text-foreground/40 text-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface CodeBlockIconProps extends ComponentProps<"div"> {
  language?: string;
}

const CodeBlockIcon = ({ language, className }: CodeBlockIconProps) => (
  <FileIcon
    width={16}
    height={16}
    fileName={`.${language ?? ""}`}
    autoAssign={true}
    className={cn(className)}
  />
);

type CodeBlockGroupProps = ComponentProps<"div">;

const CodeBlockGroup = ({
  children,
  className,
  ...props
}: CodeBlockGroupProps) => (
  <div
    className={cn(
      "flex items-center space-x-2",
      "text-foreground/40 text-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CodeBlockContent = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "overflow-y-auto",
      "bg-black",
      "whitespace-pre font-mono text-sm leading-5",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export {
  CodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
};
