module.exports = {
  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'npm run type-check',
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(tsx|jsx|ts)?(x)': (filenames) => `yarn lint . ${filenames.join(' ')}`,
}
