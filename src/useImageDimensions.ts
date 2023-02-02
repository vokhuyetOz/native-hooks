import {useEffect, useState} from 'react'
import {Image, ImageRequireSource} from 'react-native'

export interface URISource {
  uri: string
}

export type ImageDimensionsSource = ImageRequireSource | URISource

export interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

export interface ImageDimensionsResult {
  dimensions?: ImageDimensions
  error?: Error
  loading: boolean
}

/**
 * @param source either a remote URL or a local file resource.
 * @returns original image dimensions (width, height and aspect ratio).
 */
export function useImageDimensions(
  source: ImageDimensionsSource,
): ImageDimensionsResult {
  const [result, setResult] = useState<ImageDimensionsResult>({loading: true})

  useEffect(() => {
    try {
      if (typeof source === 'number') {
        const {width, height} = Image.resolveAssetSource(source)

        setResult({
          dimensions: {width, height, aspectRatio: width / height},
          loading: false,
        })

        return
      }

      if (typeof source === 'object' && source.uri) {
        setResult({loading: true})

        Image.getSize(
          source.uri,
          (width, height) =>
            setResult({
              dimensions: {width, height, aspectRatio: width / height},
              loading: false,
            }),
          (error) => setResult({error, loading: false}),
        )

        return
      }

      throw new Error('not implemented')
    } catch (error) {
      setResult({error, loading: false})
    }
  }, [source])

  return result
}
