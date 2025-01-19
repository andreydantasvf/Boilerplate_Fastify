module.exports = {
  // Lint & Prettify TS and JS files
  '*.{js,ts}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `npm run lint --fix ${filenames.join(' ')}`,
    `npm run test -- --findRelatedTests ${filenames.join(' ')}`
  ]
};
