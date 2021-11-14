module.exports = {
  displayName: 'web-reservations-feature-reservation',
  preset: '../../../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  },
  coverageDirectory: '../../../../../coverage/libs/web/reservations/feature/reservation',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ]
};
