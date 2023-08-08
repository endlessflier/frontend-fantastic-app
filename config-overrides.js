const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '~/assets': path.resolve(__dirname, 'src/assets'),
      '~/api': path.resolve(__dirname, 'src/api'),
      '~/components': path.resolve(__dirname, 'src/components'),
      '~/constant': path.resolve(__dirname, 'src/constant'),
      '~/pages': path.resolve(__dirname, 'src/pages'),
    },
  };

  return config;
};
