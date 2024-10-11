module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // For JavaScript and JSX files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handle CSS imports
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/mockFile.js', // Mock SVG and other files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform/)', // Add any specific modules that need transformation
  ],
};