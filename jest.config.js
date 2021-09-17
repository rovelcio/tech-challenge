module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testRegex: "./tests/.*.(j|t)s$",
  modulePathIgnorePatterns: [
    "<rootDir>/.aws-sam",
    "<rootDir>/tests/fixtures",
    "<rootDir>/tests/utils",
    "<rootDir>/tests/global-setup.js",
  ],
  clearMocks: true,
};
