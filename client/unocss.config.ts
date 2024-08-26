import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx
} from 'unocss';

export default defineConfig({
  // 主题配置，可以在这里自定义主题相关的样式
  theme: {
  },
  
  // 短语配置，用于定义常用的样式快捷方式
  shortcuts: {
    'h-btn': 'h-48px w-100% bg-#5C33BE b-none text-white rounded-8px'
  },
  
  // 安全列表，确保这些类不会被 Unocss 移除
  safelist: [],
  
  // 预设配置，使用 Unocss 提供的预设功能
  presets: [
    // 使用 Uno 预设，提供基本的原子类支持
    presetUno(),
    // 使用 Attributify 预设，允许通过 HTML 属性来使用样式
    presetAttributify(),
    // 使用 Icons 预设，提供图标支持，并可以自定义额外的样式属性
    presetIcons({
      // 设置额外的属性，使图标以行内块元素显示，并垂直对齐中间
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    
    // 使用 Typography 预设，提供排版相关的样式
    presetTypography(),
  ],
  
  // 转换器配置，使用 Attributify JSX 转换器
  transformers: [
    // 允许在 JSX 中使用 Attributify 语法
    transformerAttributifyJsx()
  ],
});
