import type { NextApiRequest, NextApiResponse } from 'next';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({}, { headers: CORS_HEADERS });
  }

  const { path = [] } = req.query;
  const targetUrl = `https://ai-meme-generator--immensepuma9566129.on.websim.com/${Array.isArray(path) ? path.join('/') : path}`;

  try {
    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...(req.headers as Record<string, string>),
        host: new URL(targetUrl).host,
        origin: new URL(targetUrl).origin,
        referer: targetUrl,
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Get the response as text to handle both HTML and JSON
    const data = await response.text();
    
    // Set CORS headers
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Forward the status code
    res.status(response.status);
    
    // Forward the content type
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    // Send the response
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to proxy request',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
