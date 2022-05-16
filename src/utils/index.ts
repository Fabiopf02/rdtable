import { get } from 'underscore'

export function getProperty<T>(obj: T, path: string, defaultValue: object | null = null) {
  const separatedPath = path.split('.')
  const isObject = path.indexOf('.') > -1
  return get(obj, isObject ? separatedPath : path, defaultValue)
}
