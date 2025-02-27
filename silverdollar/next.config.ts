import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // This is needed only if you want to use `import * as pdfjsLib from 'pdfjs-dist'`
    // It's not necessary if you use the dynamic imports approach
    config.resolve.alias.canvas = false;
    return config;
  },
}

export default config