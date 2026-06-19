import "./globals.css";
import { getCtiOptions } from '@/lib/api/cti-settings-option'
import { getPrimaryMenu } from '@/lib/api/menu'
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import ActiveHeader from "@/components/navigation/headers/active-header";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const options = await getCtiOptions()
  return {
    title: "CTI – Custom Audio Visual Solutions & Services",
    description:
      "CTI delivers custom AV design, installation and support for businesses, houses of worship and events. Elevate your audiovisual experience.",
    metadataBase: new URL(siteConfig.site_domain),
    alternates: { canonical: "/" },
    icons: { icon: options?.favicon?.url || '/favicon.ico' },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [options, menuItems] = await Promise.all([getCtiOptions(), getPrimaryMenu()])

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveHeader options={options} menuItems={menuItems} />
          {children}
          <Footer options={options} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
