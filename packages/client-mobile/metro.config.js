const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

function getConfig(appDir) {
  return {
    projectRoot: path.resolve(appDir),
    watchFolders: [
      path.resolve(appDir, "../../node_modules"),
      path.resolve(appDir, "../../node_modules/@quoll/ui-primitives"),
    ],
  };
}

module.exports = mergeConfig(getDefaultConfig(__dirname), getConfig(__dirname));
