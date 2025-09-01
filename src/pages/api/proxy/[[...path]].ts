import type { NextApiRequest, NextApiResponse } from 'next';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
};

const ALLOWED_DOMAINS = [
  'ai-movie-trailer-generator--relaxedbison6224150.on.websim.com',
  'aimoviemaker.on.websim.com',
  'ai-meme-generator--immensepuma9566129.on.websim.com'
];

const PROXY_CONFIG = {
  'ai-movie-trailer': {
    baseUrl: 'https://ai-movie-trailer-generator--relaxedbison6224150.on.websim.com',
    path: ''
  },
  'aimoviemaker': {
    baseUrl: 'https://aimoviemaker.on.websim.com',
    path: '/?v=2'
  },
  'default': {
    baseUrl: 'https://ai-meme-generator--immensepuma9566129.on.websim.com',
    path: ''
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({}, { headers: CORS_HEADERS });
  }

  const { path = [], ...queryParams } = req.query;
  const pathArray = Array.isArray(path) ? path : [path];
  
  // Handle the path parameter which contains the target URL
  let targetUrl: string;
  
  if (pathArray.length > 0 && pathArray[0] === 'proxy' && queryParams.path) {
    // Handle /api/proxy?path= format
    const targetPath = Array.isArray(queryParams.path) ? queryParams.path[0] : queryParams.path;
    targetUrl = `https://${targetPath}`;
    
    // Add any additional query parameters
    const otherParams = { ...queryParams };
    delete otherParams.path;
    const queryString = Object.entries(otherParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(Array.isArray(value) ? value[0] : value || '')}`)
      .join('&');
      
    if (queryString) {
      targetUrl += targetUrl.includes('?') ? `&${queryString}` : `?${queryString}`;
    }
  } else {
    // Handle path-based routing
    const service = pathArray[0] || 'default';
    const config = PROXY_CONFIG[service as keyof typeof PROXY_CONFIG] || PROXY_CONFIG.default;
    const subPath = pathArray.slice(1).join('/');
    
    targetUrl = `${config.baseUrl}${config.path}${subPath ? `/${subPath}` : ''}`;
    
    // Add query parameters
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(Array.isArray(value) ? value[0] : value || '')}`)
      .join('&');
      
    if (queryString) {
      targetUrl += targetUrl.includes('?') ? `&${queryString}` : `?${queryString}`;
    }
  }

  // Validate the target URL
  try {
    const url = new URL(targetUrl);
    if (!ALLOWED_DOMAINS.some(domain => url.hostname.endsWith(domain))) {
      console.error('Domain not allowed:', url.hostname);
      return res.status(403).json({ 
        error: 'Domain not allowed',
        message: `Access to ${url.hostname} is not permitted`
      });
    }
  } catch (e) {
    console.error('Invalid URL:', targetUrl, e);
    return res.status(400).json({ 
      error: 'Invalid URL',
      message: 'The requested URL could not be processed',
      url: targetUrl
    });
  }

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
