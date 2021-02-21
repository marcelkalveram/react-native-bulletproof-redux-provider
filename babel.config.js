module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // required to enable regenerator-runtime
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-flow',
  ],
};
