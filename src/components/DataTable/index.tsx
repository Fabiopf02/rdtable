import React from 'react'
import Table from '../TableWrapper'
import THead from '../TableHead'
import { OnEventParams, TableProps } from '../../@types'
import TBody from '../TableBody'
import Pagination from '../Pagination'
import { filterData, getFromToPaging, isObject, sliceObject, sortData } from '../../utils'
import '../../index.css'

interface Paginate {
  page: number
  sizePerPage: number
  totalSize: number
}

function DataTable(props: TableProps) {
  const {
    columns,
    data,
    onEvent,
    extraData,
    pagination,
    tableBodyStyle,
    tableHeaderStyle,
    tableWrapperStyle,
    tableRowStyle,
    remote,
    group,
    hover,
    bordered,
    striped,
  } = props
  const [tableData, setTableData] = React.useState<any[]>([])
  const [currentData, setCurrentData] = React.useState<any[]>([])
  const [totalSize, setTotalSize] = React.useState(pagination ? pagination.totalSize : 0)
  const [currentPagination, setCurrentPagination] = React.useState(pagination)

  function handleEvent(params: Omit<OnEventParams, 'extraData' | 'cellValue' | 'row'>) {
    if (params.eventName === 'filter' && !remote.filter) {
      const newData = filterData(tableData, params)
      setTotalSize(newData.length)
      changePaginate(currentPagination, newData)
    }
    if (params.eventName === 'sort' && !remote.sort) {
      const newData = sortData(tableData, params)
      changePaginate(currentPagination, newData)
    }
    onEvent?.({ ...params, extraData })
  }

  React.useEffect(() => {
    setTableData(data)
    if (!currentPagination || remote.pagination) return setCurrentData(data)
    changePaginate(currentPagination, data)
  }, [data])

  React.useEffect(() => {
    setCurrentPagination(pagination)
  }, [pagination])

  function changePaginate(params: Paginate, _data: any[] = tableData) {
    const { page, sizePerPage, totalSize: _total = totalSize } = params
    const { from, to } = getFromToPaging(page, sizePerPage, _total)
    if (isObject(_data)) {
      return setCurrentData(sliceObject(_data as object, from, to) as any[])
    }
    setCurrentData([..._data.slice(from, to)])
  }

  return (
    <div className="rdtable-wrapper">
      <Table style={tableWrapperStyle!}>
        <THead
          columns={columns}
          extraData={extraData}
          handleEvent={handleEvent}
          style={tableHeaderStyle!}
        />
        <TBody
          columns={columns}
          handleEvent={handleEvent}
          data={currentData}
          extraData={extraData}
          style={tableBodyStyle!}
          rowStyle={tableRowStyle!}
          group={group}
          hover={hover}
          bordered={bordered}
          striped={striped}
        />
      </Table>
      {currentPagination ? (
        <Pagination
          {...currentPagination}
          totalSize={totalSize}
          changePaginate={changePaginate}
          remote={!!remote.pagination}
          handleEvent={handleEvent}
        />
      ) : null}
    </div>
  )
}

DataTable.defaultProps = {
  tableWrapperStyle: {},
  tableHeaderStyle: {},
  tableBodyStyle: {},
  tableRowStyle: {},
  remote: { pagination: false },
}

export default DataTable
