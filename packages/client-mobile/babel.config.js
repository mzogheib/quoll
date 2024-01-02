module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
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
