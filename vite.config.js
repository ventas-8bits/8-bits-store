import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
//Importar: npm i vite-plugin-babel-macros
import macrosPlugin from 'vite-plugin-babel-macros';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react(), macrosPlugin()],
  });
};
