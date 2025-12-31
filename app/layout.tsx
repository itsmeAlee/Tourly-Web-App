import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth/AuthContext";
import AntdRegistry from "@/lib/antd-registry";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tour GB",
  description: "Explore Gilgit Baltistan with Confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        <AntdRegistry>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

