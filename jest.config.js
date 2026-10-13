module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|react-native-reanimated|react-native-safe-area-context|react-native-screens|@react-navigation|react-native-svg|react-native-fast-image)/)',
  ],
};
