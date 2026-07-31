import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
