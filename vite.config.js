import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//Importar: npm i vite-plugin-babel-macros
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
});
