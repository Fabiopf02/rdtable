import { get } from 'underscore'

export function getProperty<T>(obj: T, path: string, defaultValue: object | null = null) {
  const separatedPath = path.split('.')
  const isObject = path.indexOf('.') > -1
  return get(obj, isObject ? separatedPath : path, defaultValue)
}

export function getFromToPaging(page: number, sizePerPage: number, totalSize: number) {
  const from = page * sizePerPage - sizePerPage + 1
  const delimiter = from + sizePerPage - 1
  const to = delimiter > totalSize ? totalSize : delimiter

  return { from, to }
}
