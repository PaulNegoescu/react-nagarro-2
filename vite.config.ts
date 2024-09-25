import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tscPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tscPaths()],
})
