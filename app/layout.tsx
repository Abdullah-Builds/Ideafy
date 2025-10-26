import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

const workSans = localFont({
  src: [
    {
      path: "./font/Work_Sans/WorkSans-VariableFont_wght.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});



export const metadata: Metadata = {
  title: "YV Directory",
  description: "Pitch, Vote and Grow ",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
