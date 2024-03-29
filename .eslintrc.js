module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    quotes: 0,
    'no-underscore-dangle': 0,
    'no-useless-escape': 0,
    'no-useless-return': 0,
  },
};
