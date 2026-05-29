import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Kodo - Learn Java',
    description: 'A gamified Java learning platform.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${inter.variable}`}>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                </head>
                <body className="min-h-screen bg-slate-50 selection:bg-brand-500 selection:text-white flex flex-col">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
