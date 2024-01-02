module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@components": "./src/components",
          "@modules": "./src/modules",
          "@screens": "./src/screens",
          "@ui-primitives": "./src/ui-primitives",
        },
      },
    ],
  ],
};
