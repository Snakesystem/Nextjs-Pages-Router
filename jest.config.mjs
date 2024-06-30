// import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
//   coverageProvider: 'v8',
    modulePaths: ['<rootDir>/'],
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts', // ignore
        '!**/node_modules/**', // ignore,
        '!**/*.type.ts', // ignore
        '!<rootDir>/coverage/**', // ignore
        '!<rootDir>/.next/**', // ignore
        '!<rootDir>/*.config.js/**', // ignore
        '!<rootDir>/middlewares/**', // ignore
        '!<rootDir>/lib/**', // ignore
        '!<rootDir>/middleware.ts', // ignore
        '!<rootDir>/pages/api/**', // ignore
    ],
    testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)