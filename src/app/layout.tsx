import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getCourses } from "../../lib/markdown";
import { getQuizzes } from "../../lib/quiz";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Course Mastery — Study & Quiz Platform",
  description: "Dive into your curriculum, review lecture notes, and validate your knowledge with interactive quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data on the server for the Sidebar
  const courses = getCourses();
  const quizzes = getQuizzes();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}>
        <div className="flex min-h-screen">
          {/* Global Sidebar Navigation (Desktop) */}
          <Sidebar courses={courses} quizzes={quizzes} />
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-x-hidden pb-16 sm:pb-0">
            {children}
          </div>
        </div>

        {/* Global Bottom Navigation (Mobile) */}
        <MobileNav />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
