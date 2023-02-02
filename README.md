<!-- ![React Native Hooks](reactnativehooks.jpg) -->


## Extends from [react-native-community/hooks](https://github.com/react-native-community/hooks) with few extra hooks (also remove some hooks)

## Native Hooks

<!-- [![Version][version-badge]][package] -->

React Native APIs turned into React Hooks allowing you to access asynchronous APIs directly in your functional components.

> Note: You must use React Native >= 0.59.0

### Installation with npm

```sh
npm install @vok/native-hooks
```

Installation with yarn
```sh
yarn add @vok/native-hooks
```

## API
- [useAccessibilityInfo](https://github.com/vokhuyetOz/native-hooks#useaccessibilityinfo)
- [useAppState](https://github.com/vokhuyetOz/native-hooks#useappstate)
- [useBackHandler](https://github.com/vokhuyetOz/native-hooks#usebackhandler)
- [useDimensions](https://github.com/vokhuyetOz/native-hooks#usedimensions)
- [useImageDimensions](https://github.com/vokhuyetOz/native-hooks#useImageDimensions)
- [useKeyboard](https://github.com/vokhuyetOz/native-hooks#usekeyboard)
- [useInteractionManager](https://github.com/vokhuyetOz/native-hooks#useinteractionmanager)
- [useDeviceOrientation](https://github.com/vokhuyetOz/native-hooks#usedeviceorientation)
- [useForceUpdate](https://github.com/vokhuyetOz/native-hooks#useforceupdate)
- [useLayout](https://github.com/vokhuyetOz/native-hooks#uselayout)
- [useTextLayout](https://github.com/vokhuyetOz/native-hooks#usetextLayout)


### `useAccessibilityInfo`

```js
import { useAccessibilityInfo } from '@vok/native-hooks'

const {
  boldTextEnabled,
  screenReaderEnabled,
  reduceMotionEnabled, // requires RN60 or newer
  grayscaleEnabled, // requires RN60 or newer
  invertColorsEnabled, // requires RN60 or newer
  reduceTransparencyEnabled // requires RN60 or newer
} = useAccessibilityInfo()
```

### `useAppState`

AppState will change between one of 'active', 'background', or (iOS) 'inactive' when the app is closed or put into the background.

```js
import { useAppState } from '@vok/native-hooks'

const currentAppState = useAppState()
```

### `useBackHandler`

```js
import { useBackHandler } from '@vok/native-hooks'

useBackHandler(() => {
  if (shouldBeHandledHere) {
    // handle it
    return true
  }
  // let the default thing happen
  return false
})
```

### `useDimensions`

Gets dimensions and sets up a listener that will change the dimensions if the user changes device orientation.

```js
import { useDimensions } from '@vok/native-hooks'

const dimensions = useDimensions()
// or
const { width, height } = useDimensions().window
// or
const screen = useDimensions().screen
```

### `useImageDimensions`

```js
import {useImageDimensions} from '@vok/native-hooks'

const source = require('./assets/yourImage.png')
// or
const source = {uri: 'https://your.image.URI'}

const {dimensions, loading, error} = useImageDimensions(source)

if(loading || error || !dimensions) {
  return null
}
const {width, height, aspectRatio} = dimensions
```

### `useKeyboard`

```js
import { useKeyboard } from '@vok/native-hooks'

const keyboard = useKeyboard()

console.log('keyboard isKeyboardShow: ', keyboard.keyboardShown)
console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight)
```

### `useInteractionManager`

```js
import { useInteractionManager } from '@vok/native-hooks'

const interactionReady = useInteractionManager()

console.log('interaction ready: ', interactionReady)
```

### `useDeviceOrientation`

```js
import { useDeviceOrientation } from '@vok/native-hooks'

const orientation = useDeviceOrientation()

console.log('is orientation portrait: ', orientation.portrait)
console.log('is orientation landscape: ', orientation.landscape)
```
### `useForceUpdate`

```js
import { useForceUpdate } from '@vok/native-hooks'

const forceUpdate= useForceUpdate()

const onPress = () => {
  //force update if need
  forceUpdate();
}
```
### `useLayout`

```js
import { useLayout } from '@vok/native-hooks'

const { onLayout, ...layout } = useLayout()

console.log('layout: ', layout)

<View onLayout={onLayout} style={{width: 200, height: 200, marginTop: 30}} />
```
### `useTextLayout`

```js
import { useTextLayout } from '@vok/native-hooks'

const { onTextLayout, ...layout } = useTextLayout()

console.log('layout: ', layout)

<Text onLayout={onLayout} style={{width: 200, height: 200, marginTop: 30}} >Demo</Text>
```

[package]: https://www.npmjs.com/package/@vok/native-hooks

<!-- ## Thanks

We use [auto](https://github.com/intuit/auto) for automatic releases, an awesome tool by an awesome [dude](https://github.com/hipstersmoothie)! -->

## Contributors ✨

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
