module.exports = {
  "setupFiles": ['<rootDir>/src/tests/jest.setup.ts'],
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "tsx",
    "json",
    "node"
  ],
  "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "testPathIgnorePatterns": ["testHook.tsx", "jest.setup.ts"],
  "coveragePathIgnorePatterns": ["node_modules", "testHook.tsx", ".mock.ts"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  }
}
