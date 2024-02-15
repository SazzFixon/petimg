module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@petimg/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
