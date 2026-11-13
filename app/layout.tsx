import type { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = {
  title: "Mulla Nazmul Islam | Personal Archive",
  description: "Official personal portfolio and digital archive of Mulla Nazmul Islam.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body>{children}</body></html>;
}
