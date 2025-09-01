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

  const { path, ...queryParams } = req.query;
  const pathString = Array.isArray(path) ? path.join('/') : path || '';
  
  // Build query string if there are query parameters
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join('&');
  
  const targetUrl = `https://ai-meme-generator--immensepuma9566129.on.websim.com/${pathString}${queryString ? `?${queryString}` : ''}`;

  try {
    // Only forward necessary headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(req.headers.cookie && { 'Cookie': req.headers.cookie }),
      'User-Agent': req.headers['user-agent'] || '',
    };

    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Handle different response types
    const contentType = response.headers.get('content-type') || '';
    let data;
    
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Set CORS headers
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Forward the status code and content type
    res.status(response.status);
    
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    // Send the response
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to proxy request',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
