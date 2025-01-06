import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/redux-provider";
import Header from "@/components/common/header";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mapify",
  description: "Create your own map project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ReduxProvider>
          <Toaster richColors position="top-right" />
          <div className="relative min-h-screen bg-black">
            <div className="absolute inset-0 bg-custom-gradient bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-grid-overlay bg-cover bg-center mask-radial-gradient" />
            <div className="relative z-10">
              <Header />
              {children}
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
