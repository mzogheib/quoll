const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Helps with importing local packages
    nodeModulesPaths: [path.resolve(__dirname, "./node_modules")],
  },
  watchFolders: [
    // Helps with importing local packages
    path.resolve(__dirname, "../.."),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
