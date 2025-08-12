import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MUIThemeProvider from "@/components/MUIThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { Box } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lai Phát - Uy tín tạo niềm tin",
  description: "Công ty xây dựng LaiPhat - Chuyên cung cấp dịch vụ xây dựng, tư vấn, thiết kế và vật liệu xây dựng chất lượng cao.",
  icons: {
    icon: '/logo-laiphat.png',
    shortcut: '/logo-laiphat.png',
    apple: '/logo-laiphat.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/logo-laiphat.png" />
        <link rel="apple-touch-icon" href="/logo-laiphat.png" />
        <link rel="shortcut icon" href="/logo-laiphat.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MUIThemeProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <MainContent>
              {children}
            </MainContent>
            <Footer />
          </Box>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
