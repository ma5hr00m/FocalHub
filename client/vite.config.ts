import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import path, { resolve } from 'path';
import fs from 'fs';

const configPath = path.resolve(__dirname, 'config.yaml');
const configData = fs.existsSync(configPath) ? fs.readFileSync(configPath, 'utf8') : '';

// 插件配置
const plugins = [
  UnoCSS(),
  react(),
];

// 路径别名配置
const alias = {
  '@': resolve(__dirname, 'src'),
  '@components': resolve(__dirname, 'src/components'),
  '@pages': resolve(__dirname, 'src/pages'),
  '@styles': resolve(__dirname, 'src/styles'),
  '@utils': resolve(__dirname, 'src/utils'),
  '@routes': resolve(__dirname, 'src/routes'),
  '@types': resolve(__dirname, 'src/types'),
};

// Vite 配置
export default defineConfig({
  plugins,
  // go embed 需要使用相对路径
  base: './',
  // 允许本地访问方便远程开发
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias,
  },
  define: {
    'process.env.CONFIG': JSON.stringify(configData),
  }
});
