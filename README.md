# Overview

This mobile app project was bootstrapped with [React Native App](https://reactnative.dev/docs/environment-setup).

# Requirements

* [Git](https://git-scm.com/) version >= 2.39.2
* [NodeJS](https://nodejs.org/en/download/package-manager/) version >= 16.10.0
* [TypeScript](https://www.typescriptlang.org/download/) version >= 4.8.3
* [Yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable) version >= 1.22.19
* JDK [OpenJDK](http://openjdk.java.net/install/) or [Standard Edition](https://docs.oracle.com/en/java/javase/index.html) version >= 11
* Configure Android environment variables

    ```bash
    vi ~/.zshrc.local
    ````

  Add the following lines

    ```bash
    export ANDROID_HOME=$HOME/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ````

  Reload bash configuration (restart your terminal or run below command)

    ```bash
    source ~/.zshrc.local
    ````

# Development Setup

1. Clone project to your development workspace

    ```bash
    git clone git@git.web-essentials.asia:SEA-GAMES-23/sea-games-helper-app.git ~/dev/sea-games/sea-games-helper-app
    ````

2. Navigate to project root directory

    ```bash
    cd ~/dev/sea-games
    ````

3. Run yarn to install node packages

    ```bash
    yarn install
    ````

4. Start JS server with Metro Bundler

    ```bash
    yarn start
    ````

5. Start your local emulator or plug with real mobile device

### Android

1. Start your local emulator or plug with real mobile device
2. Deploy development app to online testing device(s): `adb devices`

    ```bash
    yarn android
    ```

   > Note: if you have problem with missing `ndk`, please follow this instruction: [Install NDK](https://developer.android.com/studio/projects/install-ndk) and check required version in file `android/build.gradle`

# Code check styles `ESLint`

> We inherited code styles base from [react native community](https://github.com/facebook/react-native/blob/master/packages/eslint-config-react-native-community/index.js)

* Overall check styles

    ```bash
    yarn lint
    ```

# Useful commands

* Check connected authorized or unauthorized device(s)

    ```bash
    adb devices
    ```

* Uninstall Android debug app from device(s)

    ```bash
    adb uninstall com.seagameshelperapp
