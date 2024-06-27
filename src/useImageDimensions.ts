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

const ImageDimention: {[key: string]: ImageDimensions} = {}
const MemoryCache ={
  get:(key: string)=> ImageDimention[key],
  set:(key: string, value: ImageDimensions)=> ImageDimention[key]= value
}



const getkey = (source: ImageDimensionsSource) : string => {
  if (typeof source === 'number') {
    return `${source}`;
  }
  if(typeof source === 'object' && source.uri) {
    return source.uri;
  }
  return ''
}

/**
 * @param source either a remote URL or a local file resource.
 * @returns original image dimensions (width, height and aspect ratio).
 */
export function useImageDimensions(
  source: ImageDimensionsSource,
  CacheModule = MemoryCache,
): ImageDimensionsResult { 

  const getDimensions = ()=>{
    const key = getkey(source);
    const dimensions = CacheModule.get(key)
    return dimensions
  }

  const [result, setResult] = useState<ImageDimensionsResult>(() => {
    const dimensions = getDimensions()

    if(dimensions) {
      return {
        loading: false,
        dimensions
      }
    }
    return { loading:true }
  })

  useEffect(() => {
    const dimensions = getDimensions()

    if (dimensions) {
      // update state if source changed
      if (JSON.stringify(dimensions)!== JSON.stringify(result.dimensions)) {
        setResult({
          dimensions: dimensions,
          loading: false,
        })
      }
      return
    }
    try {
      const key = getkey(source);
      if (typeof source === 'number') {
        const {width, height} = Image.resolveAssetSource(source)
        const newDimentions = {width, height, aspectRatio: width / height}
        CacheModule.set(key, newDimentions);
        setResult({
          dimensions: newDimentions,
          loading: false,
        })

        return
      }

      if (typeof source === 'object' && source.uri) {
        setResult({loading: true})

        Image.getSize(
          source.uri,
          (width, height) => {
            const newDimentions = {width, height, aspectRatio: width / height}
            CacheModule.set(key, newDimentions);
            
              setResult({
                dimensions: newDimentions,
                loading: false,
              })
          },
          (error) => setResult({error, loading: false}),
        )

        return
      }

      throw new Error('not implemented')
    } catch (error: any) {
      setResult({error, loading: false})
    }
  }, [source])

  return result
}
