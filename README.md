# React + TypeScript + Vite

## Credits
This application is based on an idea developed at https://morioh.com/a/695a25379144/full-stack-reactjs-application-with-spring-boot-and-postgresql

## Improvements
I made this contributions to the original idea:
- Added TypeScript on FE side
- Added Vite features

## Ideas for enhancements
- It would be useful to add Vitest
- Also, it could be nice to add either Zod or React Hook Form for input validations (Project is simple, no great effort for validation is required)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
