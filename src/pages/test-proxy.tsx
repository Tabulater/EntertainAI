import { useEffect, useState } from 'react';

export default function TestProxy() {
  const [status, setStatus] = useState('Testing proxy...');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const testProxy = async () => {
      try {
        setStatus('Testing proxy connection...');
        const res = await fetch('/api/proxy');
        const data = await res.text();
        
        if (res.ok) {
          setStatus('✅ Proxy is working!');
          setResponse(data.substring(0, 500) + '...'); // Show first 500 chars
        } else {
          setStatus(`❌ Proxy returned status ${res.status}`);
          setResponse(`Status: ${res.status} - ${res.statusText}\n${data}`);
        }
      } catch (error) {
        setStatus('❌ Proxy test failed');
        setResponse(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    testProxy();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Proxy Test Page</h1>
        <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-200">
          <p className="font-medium">Status: {status}</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Response:</h2>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-auto text-sm">
            {response || 'Waiting for response...'}
          </pre>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-200">
          <h2 className="font-semibold mb-2">Troubleshooting:</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>If you see CORS errors, check your Vercel project settings</li>
            <li>Make sure the target URL is accessible from your Vercel deployment</li>
            <li>Check Vercel function logs for any errors</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
