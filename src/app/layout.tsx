import {Inter} from "next/font/google"
import AppSessionProvider from "@/components/AppSessionProvider";
import{ReactNode} from "react";
import "@/app/globals.css"

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}:{children: ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppSessionProvider>{children}</AppSessionProvider>
      </body>
    </html>
  );
}