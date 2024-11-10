module.exports = {
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'no-console': 'off',
        'linebreak-style': ['error', 'windows'],
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'brace-style': ['error', '1tbs'],
        'curly': ['error', 'multi-line'],
        'no-multi-spaces': ['error'],
        'arrow-body-style': ['error', 'as-needed'], // Arrow function body style
        'arrow-parens': ['error', 'as-needed'], // Require parentheses around arrow function arguments
        'no-unused-vars': 'off', // You may want to turn this off if you're using TypeScript or another way to detect unused variables
        'comma-dangle': ['error', 'never'], // Enforce no trailing commas
        'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }] // Enforce consistent line breaks inside object literals
    }
};