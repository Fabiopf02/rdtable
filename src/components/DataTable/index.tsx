import React from 'react'
import Table from '../TableWrapper'
import THead from '../TableHead'
import { OnEventParams, TableProps } from '../../@types'
import TBody from '../TableBody'
import Pagination from '../Pagination'
import '../../index.css'
import { getFromToPaging } from '../../utils'

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
  } = props
  const [tableData, setTableData] = React.useState(data)

  function handleEvent(params: Omit<OnEventParams, 'extraData' | 'cellValue' | 'row'>) {
    onEvent?.({ ...params, extraData })
  }

  React.useEffect(() => {
    if (!pagination) return setTableData(data)
    const { page, sizePerPage, totalSize = data.length } = pagination
    const { from, to } = getFromToPaging(page, sizePerPage, totalSize)
    setTableData(data.slice(from - 1, to))
  }, [data])

  return (
    <div className="react-dtable-wrapper">
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
        />
      </Table>
      {pagination ? <Pagination {...pagination} handleEvent={handleEvent} /> : null}
    </div>
  )
}

DataTable.defaultProps = {
  pagination: {
    page: 1,
    sizePerPage: 10,
    containerStyle: {},
  },
  tableWrapperStyle: {},
  tableHeaderStyle: {},
  tableBodyStyle: {},
  tableRowStyle: {},
}

export default DataTable
