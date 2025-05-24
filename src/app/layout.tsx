// File: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Status Page",
    description: "Public status page for our services",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" className="dark">
            <body
                className={`${inter.variable} antialiased bg-black text-white min-h-screen`}
            >
            <Navbar />
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}
