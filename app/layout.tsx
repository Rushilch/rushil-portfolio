import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rushil | Software Engineer — Applied ML, Computer Vision & Backend Systems",
  description:
    "Personal portfolio of Rushil (Rushil Chilakamarri) — Software Engineer specializing in Python, Applied Machine Learning (Computer Vision, NLP), and C# / ASP.NET Core backend systems.",
  keywords: [
    "Rushil",
    "Rushil Chilakamarri",
    "Software Engineer",
    "Applied Machine Learning",
    "Computer Vision",
    "ASP.NET Core",
    "Python",
    "C#",
    "VaaniVerse",
    "EcoVision",
    "School Portal",
    "Hyderabad",
    "Aurora's Technological and Research Institute",
  ],
  authors: [{ name: "Rushil Chilakamarri", url: "https://github.com/Rushilch" }],
  creator: "Rushil Chilakamarri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Rushilch",
    title: "Rushil | Software Engineer — Applied ML & Backend Systems",
    description:
      "I build complete systems end-to-end — from model to interface to deployment. Applied ML (CV, NLP) and C# / ASP.NET Core backend engineering.",
    siteName: "Rushil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushil | Software Engineer",
    description:
      "Software Engineer specializing in Python, Applied Machine Learning (Computer Vision, NLP), and C# / ASP.NET Core backend systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rushil Chilakamarri",
    alternateName: "Rushil",
    jobTitle: "Software Engineer",
    description:
      "Software Engineer specializing in applied Machine Learning (Computer Vision & NLP) and backend systems with Python and C# / ASP.NET Core.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Aurora's Technological and Research Institute, Hyderabad",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/Rushilch",
      "https://www.linkedin.com/in/rushil-chilakamarri/",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#07090e] text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-slate-950`}
      >
        <div className="fixed inset-0 bg-tech-grid opacity-30 pointer-events-none -z-20" />
        {children}
      </body>
    </html>
  );
}
