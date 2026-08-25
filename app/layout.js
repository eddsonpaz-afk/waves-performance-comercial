import './globals.css';

export const metadata = {
  metadataBase: new URL('https://waves-performance-comercial.vercel.app'),
  title: 'Performance Comercial | Waves Plus + CBS',
  description: 'Dashboard comercial integrado à base LEADS - DASH',
  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/icon.jpg'
  },
  openGraph: {
    title: 'Performance Comercial | Waves Plus + CBS',
    description: 'Dashboard comercial integrado à base LEADS - DASH',
    url: 'https://waves-performance-comercial.vercel.app/',
    siteName: 'Performance Comercial',
    images: [
      {
        url: '/og-image.jpg',
        width: 512,
        height: 512,
        alt: 'Performance Comercial | Waves Plus + CBS'
      }
    ],
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Performance Comercial | Waves Plus + CBS',
    description: 'Dashboard comercial integrado à base LEADS - DASH',
    images: ['/og-image.jpg']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
