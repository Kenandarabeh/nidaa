Welcome to **Nidaa**! 🚨 

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). **Nidaa** is designed as an emergency response application to help government agencies assist people during critical situations like fires, natural disasters, and other emergencies. 🚒 🚑

# Getting Started 🚀

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server 🏃‍♂️

First, you will need to start **Metro**, the JavaScript bundler that ships with React Native.

To start Metro, run the following command from the root of your React Native project:

### Using Yarn
```bash
yarn start
```
### To use another port
```bash
npx react-native start --port 8082
```

## Step 2: Start your Application 📱

Let Metro Bundler run in its own terminal. Open a new terminal from the root of your React Native project. Run the following command to start your Android or iOS app:

### For Android
```bash
yarn android
```

### For iOS
```bash
yarn ios
```

If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator shortly, provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Building your Application 🛠️

To build your application for Android and iOS, you can use the following commands:

### For Android
```bash
yarn build:android --build-cache
```
Or
```bash
yarn build:android --parallel
```

### For iOS
```bash
yarn build:ios --build-cache
```
Or
```bash
yarn build:ios --parallel
```

## Step 4: Installing the Application 📲

To install the app quickly, you can use the following commands:

### For Android
```bash
yarn install:android
```

### For iOS
```bash
yarn install:ios
```

## Step 5: Cleaning the Application 🧹

To clean the app, use the following commands:

### For Android
```bash
yarn clean:android
```

### For iOS
```bash
yarn clean:ios
```

## Step 6: Modifying your App ✏️

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> on Windows and Linux or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> on macOS) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Dependencies 📚

This project uses the following libraries and technologies to provide robust emergency response features:

### Main Dependencies

- [**@babel/plugin-proposal-class-properties**](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties): A Babel plugin for class properties.
- [**@babel/plugin-proposal-decorators**](https://babeljs.io/docs/en/babel-plugin-proposal-decorators): A Babel plugin for decorators.
- [**@formatjs/intl-getcanonicallocales**](https://formatjs.io/docs/polyfills/intl-getcanonicallocales): Polyfill for `Intl.getCanonicalLocales`.
- [**@formatjs/intl-locale**](https://formatjs.io/docs/polyfills/intl-locale): Polyfill for `Intl.Locale`.
- [**@formatjs/intl-pluralrules**](https://formatjs.io/docs/polyfills/intl-pluralrules): Polyfill for `Intl.PluralRules`.
- [**@react-native-async-storage/async-storage**](https://react-native-async-storage.github.io/async-storage/): An asynchronous, unencrypted, persistent, key-value storage system for React Native.
- [**@react-navigation/native**](https://reactnavigation.org): Routing and navigation for your React Native apps.
- [**@react-navigation/native-stack**](https://reactnavigation.org/docs/native-stack-navigator/): Stack navigator for React Navigation.
- [**@react-navigation/stack**](https://reactnavigation.org/docs/stack-navigator/): Stack navigator for React Navigation.
- [**@reduxjs/toolkit**](https://redux-toolkit.js.org): The official, recommended way to write Redux logic.
- [**axios**](https://axios-http.com): Promise based HTTP client for the browser and Node.js.
- [**i18next**](https://www.i18next.com): Internationalization framework for React.
- [**nativewind**](https://www.nativewind.dev): A utility-first CSS framework for React Native.
- [**react**](https://reactjs.org): A JavaScript library for building user interfaces.
- [**react-i18next**](https://react.i18next.com): Internationalization for React done right.
- [**react-native**](https://reactnative.dev): A framework for building native apps using React.
- [**react-native-asset**](https://github.com/unimonkiez/react-native-asset): A CLI tool to manage assets in React Native.
- [**react-native-linear-gradient**](https://github.com/react-native-linear-gradient/react-native-linear-gradient): A `<LinearGradient>` component for React Native.
- [**react-native-localize**](https://github.com/zoontek/react-native-localize): A library to help you localize your React Native app.
- [**react-native-safe-area-context**](https://github.com/th3rdwave/react-native-safe-area-context): A library to handle safe area insets in React Native.
- [**react-native-screens**](https://github.com/software-mansion/react-native-screens): Native navigation primitives for your React Native app.
- [**react-native-size-matters**](https://github.com/nirsky/react-native-size-matters): A library to make React Native styling easier.
- [**react-native-vector-icons**](https://github.com/oblador/react-native-vector-icons): Customizable Icons for React Native with support for NavBar/TabBar/ToolbarAndroid, image source and full styling.
- [**react-redux**](https://react-redux.js.org): Official React bindings for Redux.
- [**redux**](https://redux.js.org): A predictable state container for JavaScript apps.
- [**tailwindcss**](https://tailwindcss.com): A utility-first CSS framework.

### Development Dependencies

- [**@babel/core**](https://babeljs.io): Babel compiler core.
- [**@babel/preset-env**](https://babeljs.io/docs/en/babel-preset-env): A Babel preset for each environment.
- [**@babel/runtime**](https://babeljs.io/docs/en/babel-runtime): Babel runtime helpers.
- [**@react-native/babel-preset**](https://github.com/facebook/react-native/tree/main/packages/babel-preset): Babel preset for React Native.
- [**@react-native/eslint-config**](https://github.com/facebook/react-native/tree/main/packages/eslint-config-react-native-community): ESLint configuration for React Native.
- [**@react-native/metro-config**](https://github.com/facebook/react-native/tree/main/packages/metro-config): Metro configuration for React Native.
- [**@react-native/typescript-config**](https://github.com/facebook/react-native/tree/main/packages/typescript-config): TypeScript configuration for React Native.
- [**@types/react**](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react): TypeScript definitions for React.
- [**@types/react-test-renderer**](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-test-renderer): TypeScript definitions for React Test Renderer.
- [**babel-jest**](https://github.com/facebook/jest/tree/main/packages/babel-jest): Babel transformer for Jest.
- [**eslint**](https://eslint.org): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [**jest**](https://jestjs.io): Delightful JavaScript Testing.
- [**prettier**](https://prettier.io): An opinionated code formatter.
- [**react-test-renderer**](https://reactjs.org/docs/test-renderer.html): React package for snapshot testing.
- [**typescript**](https://www.typescriptlang.org): A typed superset of JavaScript that compiles to plain JavaScript.

### How to Install Dependencies

To install all the dependencies for this project, run the following command:

```bash
yarn install
```

This will install all the libraries listed in the `package.json` file.

## About Nidaa 🆘

Nidaa is an emergency response platform that:
- Connects citizens with government emergency services
- Provides real-time emergency alerts and notifications
- Helps coordinate response efforts during critical situations
- Enables quick reporting of emergencies
- Facilitates communication between responders and citizens

## Congratulations! 🎉

You've successfully run and modified your React Native App. 🎊

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting 🛠️

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More 📚

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an overview of React Native and how to set up your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a guided tour of the React Native basics.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native Blog posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source GitHub repository for React Native.

Happy coding! 💻✨
