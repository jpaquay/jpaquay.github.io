module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.js$": "<rootDir>/jest-liquid-transformer.js"
  }
};
