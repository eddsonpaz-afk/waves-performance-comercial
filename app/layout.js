import './globals.css';
import './font-overrides.css';

export const metadata = {
  metadataBase: new URL('https://waves-performance-comercial.vercel.app'),
  title: 'CRM CBS',
  description: 'Dashboard Comercial • CBS Importadora / Waves Plus',
  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/icon.jpg'
  },
  openGraph: {
    title: 'CRM CBS',
    description: 'Dashboard Comercial • CBS Importadora / Waves Plus',
    url: 'https://waves-performance-comercial.vercel.app/',
    siteName: 'CRM CBS',
    images: [
      {
        url: 'https://waves-performance-comercial.vercel.app/api/og?v=4',
        secureUrl: 'https://waves-performance-comercial.vercel.app/api/og?v=4',
        width: 600,
        height: 600,
        alt: 'CRM CBS',
        type: 'image/png'
      }
    ],
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRM CBS',
    description: 'Dashboard Comercial • CBS Importadora / Waves Plus',
    images: ['https://waves-performance-comercial.vercel.app/api/og?v=4']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
