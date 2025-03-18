module.exports = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    testMatch: ["**/+(*.)+(spec).+(ts)"],
    collectCoverage: true,
    coverageReporters: ["html", "lcov", "text-summary"],
    moduleDirectories: ["node_modules", "src"],
  };