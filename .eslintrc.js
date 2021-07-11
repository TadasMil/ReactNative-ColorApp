module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
