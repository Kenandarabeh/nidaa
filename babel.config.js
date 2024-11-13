module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-paper/babel',
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv'],
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }]
  ],
};