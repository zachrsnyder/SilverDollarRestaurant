import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./maincomps/NavBar";
import Footer from './maincomps/Footer'
import {Arvo} from 'next/font/google'
import { getMenu } from "@/lib/util/getMenu";
import AltNavBar from "./maincomps/AltNavBar";
// import { usePathname } from "next/navigation";


// Cache the getData function



export const arvo = Arvo({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-arvo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Silver Dollar",
  icons: {
    icon: "/favicon.png",
  },
  description: "The Silver Dollar is a homey restaurant right off US-54 at the Eldon-Tuscombia exit.",
  openGraph: {
    title: 'Silver Dollar',
    description: "The Silver Dollar is a homey restaurant right off US-54 at the Eldon-Tuscombia exit.",
    images: [{
      url: '@/public/images/logo.png',
      width: 1200,
      height: 630,
      alt: 'Silver Dollar Logo'
    }],
  },
  keywords: [
    "breakfast Lake of the Ozarks",
    "best breakfast Lake Ozark MO",
    "Lake Ozark brunch spots",
    "Lake of the Ozarks breakfast café",
    "top breakfast restaurants Lake Ozark",
    "breakfast diner Lake Ozark Missouri",
    "morning coffee Lake Ozark",
    "Lake Ozark pancakes and waffles",
    "fresh breakfast Lake of the Ozarks",
    "family breakfast spot Lake Ozark",
    "breakfast and brunch Lake Ozark MO",
    "Lake Ozark coffee shop and breakfast",
    "breakfast specials Lake Ozark",
    "Lake of the Ozarks morning dining",
    "Lake Ozark bakery and breakfast",
    "all-day breakfast Lake Ozark",
    "best brunch Lake of the Ozarks",
    "breakfast sandwiches Lake Ozark MO",
    "Lake Ozark omelets and pancakes",
    "Lake of the Ozarks café breakfast"
  ]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${arvo.variable} antialiased`}
        
      >
        {/* {!shouldHideHeaderFooter && <NavBar />} */}
        <main className='relative'>{children}</main>
        {/* {!shouldHideHeaderFooter && <Footer />} */}
        <Footer/>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              document.documentElement.style.setProperty('--scroll', window.scrollY);
            }, { passive: true });
          `
        }} />
      </body>
    </html>
  );
}
