import { ImageResponse } from 'next/og';

export const runtime = 'edge';

function toBase64(bytes) {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export async function GET() {
  const sourceUrl = 'https://waves-performance-comercial.vercel.app/og-image.jpg?v=3';
  const source = await fetch(sourceUrl, { cache: 'no-store' });

  if (!source.ok) {
    return new Response('Preview source unavailable', { status: 502 });
  }

  const bytes = new Uint8Array(await source.arrayBuffer());
  const dataUrl = `data:image/jpeg;base64,${toBase64(bytes)}`;

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#061329',
          alignItems: 'center',
          justifyContent: 'center'
        },
        children: {
          type: 'img',
          props: {
            src: dataUrl,
            width: 600,
            height: 600,
            style: {
              width: '600px',
              height: '600px',
              objectFit: 'cover'
            }
          }
        }
      }
    },
    {
      width: 600,
      height: 600
    }
  );
}
