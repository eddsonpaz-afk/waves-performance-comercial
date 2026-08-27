import sharp from 'sharp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const sourceUrl = 'https://waves-performance-comercial.vercel.app/og-image.jpg?v=3';
  const source = await fetch(sourceUrl, { cache: 'no-store' });

  if (!source.ok) {
    return new Response('Preview source unavailable', { status: 502 });
  }

  const input = Buffer.from(await source.arrayBuffer());
  const output = await sharp(input)
    .resize(600, 600, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(output, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': String(output.length),
      'Cache-Control': 'public, max-age=0, s-maxage=300, must-revalidate'
    }
  });
}
