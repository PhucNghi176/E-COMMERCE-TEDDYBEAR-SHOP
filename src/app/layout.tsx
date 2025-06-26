// app/layout.tsx
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import MainFooter from '@/components/Footer';
import MainNavbar from '@/components/Navbar';
import { QueryProvider } from '@/providers/query';
import { ThemeProvider } from '@/providers/theme';
import '@/styles/globals.css';
import type { ChildrenProps } from '@/types';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  icons: {
    icon: '/logo.png',
  },
  title: 'Không thích gấu bông | Gấu bông Ngân Phạm',
  keywords:
    'gấu bông,gaubong, gau bong, ngan pham, gấu bông ngân phạm, gaubongnganpham,gau bong ngan pham',
  authors: [{ name: 'Ngân Phạm' }],
  creator: 'Ngân Phạm',
  metadataBase: new URL('https://khongthichgaubong.online'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://khongthichgaubong.online',
    title: 'Không thích gấu bông | Gấu bông Ngân Phạm',
    description:
      'Gấu bông Ngân Phạm',
    siteName: 'Gấu bông Ngân Phạm',
  },
};

function RootLayoutContent({ children }: ChildrenProps) {
  return (

    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <UserProvider>
              <div className="flex min-h-screen bg-[var(--background)] w-full overflow-x-hidden">
                <div className="flex-1 flex flex-col w-full">
                  <MainNavbar />
                  <main className="flex-1 w-full overflow-x-hidden">
                    {children}
                  </main>
                  <MainFooter />
                </div>
              </div>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  className:
                    'bg-[var(--card)] text-[var(--foreground)] border-[var(--border)]',
                  duration: 3000,
                }}
              />
            </UserProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased overflow-x-hidden`}
      >
        <UserProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </UserProvider>
      </body>
    </html>
  );
}
