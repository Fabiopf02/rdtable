import React, { HTMLInputTypeAttribute } from 'react'

export interface CellEvent {
  event: any
  eventName: string
}

interface FnParams {
  cellValue: any
  row: any
  extraData: any
  index: number
}

export interface OnEventParams {
  event: any
  eventName: string

  fieldName?: string
  cellValue?: any
  row?: any
  extraData?: any
  index?: number

  /* pagination */
  sizePerPage?: number
  currentPage?: number
  oldPage?: number

  /* filter */
  filterValue?: string
}

interface CellComponentParams extends FnParams {
  onEvent: (event: CellEvent) => void
}

interface CustomSizePerPageRendererFn {
  onChangeSizePerPage: (params: { event?: any; newSizePerPage: number }) => React.ReactNode
}

export interface PaginationProps {
  totalSize: number
  sizePerPage: number
  page: number
  paginationSize: number
  showTotal: boolean
  sizePerPageList?: number[]
  containerStyle?: React.CSSProperties
  remote: boolean
  changePaginate: (params: { page: number; sizePerPage: number; totalSize: number }) => void
  handleEvent: (params: Omit<OnEventParams, 'fieldName' | 'cellValue' | 'row'>) => void
  paginationTotalRenderer?: (from: number, to: number, size: number) => React.ReactNode
  customSizePerPageRenderer?: (params: CustomSizePerPageRendererFn) => React.ReactNode
}

interface Filter extends Partial<HTMLInputElement> {
  customRenderer?: (params: Omit<CellComponentParams, 'cellValue' | 'row'>) => React.ReactNode
}

export interface Column {
  text: string
  headerClassName?: string
  header?: (params: Omit<CellComponentParams, 'cellValue' | 'row'>) => React.ReactNode
  filter?: Filter
  fieldName: string
  editable?: boolean
  extraData?: any
  headerStyle?: React.CSSProperties
  cellStyle?: React.CSSProperties
  cellClassName?: (params: FnParams) => string
  cell?: (params: CellComponentParams) => React.ReactNode
}

export interface CellProps
  extends Omit<Column, 'text' | 'header' | 'headerClassName' | 'headerStyle'> {
  row: any
  extraData: any
  editable?: boolean
  dataIndex: number
  cellStyle?: React.CSSProperties
  handleEvent: (params: Omit<OnEventParams, 'extraData'>) => void
}

export interface THeaderProps {
  extraData?: any
  style: React.CSSProperties
  handleEvent: (params: Omit<OnEventParams, 'extraData' | 'row' | 'cellValue'>) => void
  columns: Column[]
}

interface Group<T = any> {
  type: 'objects' | 'arrays'
  customTitleRenderer?: (title: string, groupData: T[]) => React.ReactNode
}

export interface TableProps {
  data: any[]
  extraData?: any
  columns: Column[]
  pagination: Omit<PaginationProps, 'handleEvent'>
  tableWrapperStyle?: React.CSSProperties
  tableBodyStyle?: React.CSSProperties
  tableHeaderStyle?: React.CSSProperties
  tableRowStyle?: React.CSSProperties
  remote: {
    pagination: boolean
    filter: boolean
  }
  /**
   * - for `type='objects'` `data` must be of type `{'title': [{...}, ...], ...}`
   * - for `type='arrays'` `data` must be of type `[[{...}, ...], ...]`
   */
  group?: Group
  onEvent: (params: OnEventParams) => void
}

export interface InputFilterProps {
  className: string
  placeholder: string
  type: HTMLInputTypeAttribute
}
