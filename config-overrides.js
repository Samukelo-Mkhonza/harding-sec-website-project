/**
 * Webpack Configuration Overrides for Code Splitting
 * This file customizes Create React App's webpack configuration
 * 
 * To use this, install react-app-rewired:
 * npm install --save-dev react-app-rewired
 * 
 * Then update package.json scripts to use react-app-rewired instead of react-scripts
 */

module.exports = function override(config, env) {
  // Optimize chunk splitting
  if (env === 'production') {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunk for node_modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          // React and React-DOM in separate chunk
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Framer Motion in separate chunk (large library)
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 15,
            reuseExistingChunk: true,
          },
          // Common code shared between pages
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
        // Maximum size for chunks (200KB)
        maxSize: 200000,
      },
      // Runtime chunk for webpack runtime code
      runtimeChunk: {
        name: 'runtime',
      },
    };

    // Add bundle analyzer in development
    if (process.env.ANALYZE) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  }

  return config;
};
