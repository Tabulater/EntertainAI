import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      'process.env': {
        VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
        VITE_SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
      }
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // For Vercel deployment
    server: {
      port: 3000,
      strictPort: true
    },
    preview: {
      port: 3000,
      strictPort: true
    }
  };
});
