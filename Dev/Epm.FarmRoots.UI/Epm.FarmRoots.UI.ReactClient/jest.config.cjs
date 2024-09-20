module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Adjust path if necessary
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ["html", "text-summary",'json', 'text', 'lcov', 'clover'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': 'jest-transform-stub',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  
};
