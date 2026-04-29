exports.handler = async function(event) {
  const action = event.queryStringParameters?.action;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { getStore } = await import('@netlify/blobs');
  const store = getStore('prog');

  if (action === 'get') {
    try {
      const data = await store.get('programmation', { type: 'json' });
      if (!data) return { statusCode: 404, headers, body: JSON.stringify({ error: 'no data' }) };
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch (e) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: String(e) }) };
    }
  }

  if (action === 'set' && event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      await store.setJSON('programmation', body);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch (e) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: String(e) }) };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'method not allowed' }) };
};
