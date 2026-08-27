import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const imageUrl = 'https://waves-performance-comercial.vercel.app/og-image.jpg?v=3';

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
            src: imageUrl,
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
