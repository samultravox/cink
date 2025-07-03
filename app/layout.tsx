import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PINK™ – Seductive Empire Intelligence Suite',
  description: 'Elite chat monetization command center for GravOps team',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={outfit.className}>
        <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--obsidian))] via-[rgb(var(--charcoal))] to-[rgb(var(--obsidian))]">
          {children}
        </div>
      </body>
    </html>
  );
}