import React from 'react'
import Table from '../TableWrapper'
import THead from '../TableHead'
import { OnEventParams, TableProps } from '../../@types'
import TBody from '../TableBody'
import Pagination from '../Pagination'
import { getFromToPaging, isObject, sliceObject } from '../../utils'
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
  } = props
  const [tableData, setTableData] = React.useState<any[]>([])

  function handleEvent(params: Omit<OnEventParams, 'extraData' | 'cellValue' | 'row'>) {
    onEvent?.({ ...params, extraData })
  }

  React.useEffect(() => {
    if (!pagination || remote.pagination) return setTableData(data)
    changePaginate(pagination)
  }, [])

  function changePaginate(params: Paginate) {
    const { page, sizePerPage, totalSize = data.length } = params
    const { from, to } = getFromToPaging(page, sizePerPage, totalSize)
    if (isObject(data)) {
      return setTableData(sliceObject(data as object, from, to) as any[])
    }
    setTableData([...data.slice(from, to)])
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
          data={tableData}
          extraData={extraData}
          style={tableBodyStyle!}
          rowStyle={tableRowStyle!}
          group={group}
        />
      </Table>
      {pagination ? (
        <Pagination
          {...pagination}
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
