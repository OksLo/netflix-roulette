export default {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '\\.module\\.scss$': 'identity-obj-proxy',
    },
};