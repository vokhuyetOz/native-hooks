import {useState, useCallback} from 'react'

export function useTextLayout() {
  const [textLayout, setTextLayout] = useState({
    lines: [],
    target: undefined,
  })
  const onTextLayout = useCallback((e) => setTextLayout(e.nativeEvent), [])

  return {
    onTextLayout,
    ...textLayout,
  }
}
