import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ContextWrapper from "@/components/ContextWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop",
  description: "Created by Lukasz Surma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextWrapper>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex grow bg-slate-100">{children}</main>
            <Loading />
            <Footer />
          </div>
        </ContextWrapper>
      </body>
    </html>
  );
}
