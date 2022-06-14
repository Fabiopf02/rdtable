import { get } from 'underscore'
import { OnEventParams } from '../@types'

export function getProperty<T>(obj: T, path: string, defaultValue: object | null = null) {
  const separatedPath = path.split('.')
  const isObject = path.indexOf('.') > -1
  return get(obj, isObject ? separatedPath : path, defaultValue)
}

export function filterData(
  data: any[],
  params: Omit<OnEventParams, 'extraData' | 'cellValue' | 'row'>,
) {
  const { fieldName, filterValue } = params
  if (isObject(data)) return data
  const newData = data.filter((row: any) => {
    const cellValue = getProperty(row, fieldName!)
    return cellValue.toString().toLowerCase().includes(filterValue!.toString().toLowerCase())
  })
  return newData
}

export function getFromToPaging(page: number, sizePerPage: number, totalSize: number) {
  const from = page * sizePerPage - sizePerPage
  const delimiter = from + sizePerPage - 1
  const to = delimiter > totalSize ? totalSize : delimiter + 1

  return { from, to }
}

export function isObject(param: any) {
  return Object.prototype.toString.call(param) === '[object Object]'
}
export function isArray(param: any) {
  return Object.prototype.toString.call(param) === '[object Array]'
}

export function sliceObject(_object: object, start = 0, end = 0) {
  const sliced = Object.fromEntries(Object.entries(_object).slice(start, end))
  return sliced
}
