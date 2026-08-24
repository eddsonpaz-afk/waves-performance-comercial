import './globals.css';

export const metadata = {
  title: 'Performance Comercial | Waves Plus + CBS',
  description: 'Dashboard comercial integrado à base LEADS - DASH'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
