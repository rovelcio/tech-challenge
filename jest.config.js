module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testRegex: "./tests/.*.(j|t)s$",
  moduleNameMapper: {
    "^#lib/(.*)$": "<rootDir>/src/lib/$1",
    "^#types/(.*)$": "<rootDir>/src/types/$1",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/.aws-sam",
    "<rootDir>/tests/fixtures",
    "<rootDir>/tests/utils",
    "<rootDir>/tests/global-setup.js",
  ],
  clearMocks: true,
};
