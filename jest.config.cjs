// Jest configuration file for the Tic-Tac-Toe React project

module.exports = {
  // Simulates a browser environment for testing React components
  testEnvironment: 'jsdom',

  // Runs this file after the test environment is set up, useful for global settings
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Tells Jest which file types to recognize
  moduleFileExtensions: ['js', 'jsx'],

  // Transforms JavaScript and JSX files using Babel before running tests
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
