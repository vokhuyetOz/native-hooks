import {useState, useCallback} from 'react'
import {TextLayoutEventData, NativeSyntheticEvent} from 'react-native'

export function useTextLayout() {
  const [textLayout, setTextLayout] = useState<TextLayoutEventData>({
    lines: [],
    target: -1,
  })
  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) =>
      setTextLayout(e.nativeEvent),
    [],
  )

  return {
    onTextLayout,
    ...textLayout,
  }
}
