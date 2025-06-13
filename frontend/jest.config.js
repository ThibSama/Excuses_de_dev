module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!(@mswjs|tough-cookie|@bundled-es-modules|msw)/)",
  ],
  moduleNameMapper: {
    "^msw/node$": "msw/lib/node/index.js",
  },
};
