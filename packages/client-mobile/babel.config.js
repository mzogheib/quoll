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
          "@utils": "./src/utils",
        },
      },
    ],
    ["module:react-native-dotenv"],
  ],
};
