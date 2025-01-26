module.exports = {
    parser: '@typescript-eslint/parser', // For TypeScript support
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended', // If you're using React
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    rules: {
      // Add or override rules as per your requirements
      'no-console': 'warn',  // Example: warn on console.log statements
    },
  };
  