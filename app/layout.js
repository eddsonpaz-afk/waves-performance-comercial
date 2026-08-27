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
        url: '/crm-cbs-preview-v3.jpg',
        secureUrl: 'https://waves-performance-comercial.vercel.app/crm-cbs-preview-v3.jpg',
        width: 320,
        height: 320,
        alt: 'CRM CBS',
        type: 'image/jpeg'
      }
    ],
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'CRM CBS',
    description: 'Dashboard Comercial • CBS Importadora / Waves Plus',
    images: ['/crm-cbs-preview-v3.jpg']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
