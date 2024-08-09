import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Import Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cyber Physical System Laboratory",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer /> {/* Tambahkan Footer di sini */}
      </body>
    </html>
  );
}
