import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwK94FvHdbWpEipC_4N9Uq6YoV7nxcpuGDByoJofpE-TO-pNJMnUaHCvk6FdDk72rPv_w/exec';
const API_TOKEN = process.env.CRM_API_TOKEN || '';

async function parseResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('O Apps Script ainda não está retornando JSON. Atualize o Code.gs com a versão de API deste projeto e publique uma nova versão do Web App.');
  }
}

export async function GET() {
  try {
    const url = new URL(APPS_SCRIPT_URL);
    url.searchParams.set('api', 'leads');
    url.searchParams.set('_', String(Date.now()));

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'follow'
    });

    if (!response.ok) throw new Error(`Apps Script respondeu ${response.status}`);
    const data = await parseResponse(response);
    return NextResponse.json(data, { status: data.success === false ? 502 : 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Erro ao carregar leads.' }, { status: 502 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, token: API_TOKEN }),
      cache: 'no-store',
      redirect: 'follow'
    });

    if (!response.ok) throw new Error(`Apps Script respondeu ${response.status}`);
    const data = await parseResponse(response);
    return NextResponse.json(data, { status: data.success === false ? 400 : 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Erro ao salvar lead.' }, { status: 500 });
  }
}
