module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|expo" +
      "|victory-native" +
      "|@shopify/react-native-skia" +
      "|@react-navigation" +
      ")/)"
  ],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleNameMapper: {
    '\\.(ttf|otf|woff|woff2|eot|png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@expo/vector-icons/Ionicons$': '<rootDir>/__mocks__/IoniconsMock.js',
    'react-native-reanimated': '<rootDir>/__mocks__/react-native-reanimated.js'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'store/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    'screens/**/*.{ts,tsx}',
    'services/**/*.{ts,tsx}'
  ],
  coverageReporters: ['text', 'lcov']
}
