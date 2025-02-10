module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'google',
    ignorePatterns: [],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'indent': ['error', 4],
        'max-len': ['error', {'code': 120}],
        'prefer-const': 'off',
    },
};
