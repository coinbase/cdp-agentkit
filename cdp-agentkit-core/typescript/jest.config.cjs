const baseConfig = require("../../jest.config.base.cjs");

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: ["node_modules", "dist", "docs", "index.ts"],
  coverageThreshold: {
    "./src/actions/cdp/*": {
      branches: 50,
      functions: 50,
      statements: 50,
      lines: 50,
    },
    "./src/actions/cdp/defi/wow/actions/*": {
      branches: 50,
      functions: 50,
      statements: 50,
      lines: 50,
    },
  },
};
