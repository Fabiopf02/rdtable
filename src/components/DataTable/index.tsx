import React from 'react'
import Table from '../TableWrapper'
import THead from '../TableHead'
import { OnEventParams, TableProps } from '../../@types'
import TBody from '../TableBody'
import Pagination from '../Pagination'

function DataTable(props: TableProps) {
  const { columns, data, onEvent, extraData, pagination } = props

  function handleEvent(params: Omit<OnEventParams, 'extraData'|'cellValue'|'row'>) {
    onEvent?.({ ...params, extraData })
  }

  return (
    <div className="react-dtable-wrapper">
      <Table>
        <THead columns={columns} extraData={extraData} handleEvent={handleEvent} />
        <TBody columns={columns} handleEvent={handleEvent} data={data} extraData={extraData} />
      </Table>
      {pagination ? <Pagination {...pagination} /> : null}
    </div>
  )
}

export default DataTable
