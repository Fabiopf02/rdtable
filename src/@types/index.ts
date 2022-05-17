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
  remote: boolean
  sizePerPageList: number[]
  handleEvent: (params: Omit<OnEventParams, 'fieldName' | 'cellValue' | 'row'>) => void
  paginationTotalRenderer: (from: number, to: number, size: number) => React.ReactNode
  customSizePerPageRenderer: (params: CustomSizePerPageRendererFn) => React.ReactNode
}

export interface Column {
  text: string
  headerClassName?: string
  header: (params: Omit<CellComponentParams, 'cellValue' | 'row'>) => React.ReactNode
  fieldName: string
  sortable?: boolean
  filter: (params: Omit<CellComponentParams, 'cellValue' | 'row'>) => React.ReactNode
  editable?: boolean
  extraData: any
  cellClassName?: (params: FnParams) => string
  cell?: (params: CellComponentParams) => React.ReactNode
}

export interface CellProps extends Column {
  row: any
  className?: string
  extraData: any
  editable?: boolean
  dataIndex: number
  handleEvent: (params: Omit<OnEventParams, 'extraData'>) => void
}

export interface THeaderProps {
  extraData?: any
  handleEvent: (params: Omit<OnEventParams, 'extraData' | 'row' | 'cellValue'>) => void
  columns: Column[]
}

export interface TableProps {
  data: any[]
  extraData: any
  columns: Column[]
  pagination: PaginationProps
  onEvent: (params: OnEventParams) => void
}

export interface InputFilterProps {
  className: string
  placeholder: string
  type: HTMLInputTypeAttribute
}
