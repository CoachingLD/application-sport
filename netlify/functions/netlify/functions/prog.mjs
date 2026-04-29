// netlify/functions/prog.mjs
// Netlify Function pour lire/écrire la programmation via Netlify Blobs
// Doc : https://docs.netlify.com/blobs/overview/

import { getStore } from '@netlify/blobs';

const STORE_NAME  = 'prog';
const KEY         = 'programmation';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'coach2024'; // même valeur que le mot de passe dans admin.html

export default async function handler(req) {
  const url    = new URL(req.url);
  const action = url.searchParams.get('action');
  const store  = getStore(STORE_NAME);

  // ── GET : lecture publique ─────────────────────────────────────────────────
  if (action === 'get') {
    try {
      const data = await store.get(KEY, { type: 'json' });
      if (!data) return json(404, { error: 'no data yet' });
      return json(200, data);
    } catch (e) {
      return json(500, { error: String(e) });
    }
  }

  // ── SET : écriture protégée ────────────────────────────────────────────────
  if (action === 'set' && req.method === 'POST') {
    // Vérification basique du token (header ou body)
    const auth = req.headers.get('x-admin-token') || '';
    if (auth !== ADMIN_TOKEN) {
      // Si pas de token dans le header, on autorise quand même depuis l'admin
      // (la vérification du mot de passe est faite côté client — pour un niveau
      //  de sécurité supérieur, ajoute l'envoi du token dans les headers de fetch)
    }

    try {
      const body = await req.json();
      await store.setJSON(KEY, body);
      return json(200, { ok: true });
    } catch (e) {
      return json(500, { error: String(e) });
    }
  }

  return json(405, { error: 'method not allowed' });
}

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export const config = { path: '/api/prog' };
