import React from 'react'
import DataTable from './components/DataTable'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')
const root = createRoot(container)

const data = [
  { user: { name: 'John', age: 30 } },
  { user: { name: 'Jane', age: 28 } },
  { user: { name: 'Joe', age: 32 } },
]

const columns = [
  {
    text: 'Name',
    fieldName: 'user.name',
    editable: true,
  },
  {
    text: 'Age',
    fieldName: 'user.age',
    header: ({ onEvent }) => (
      <button onClick={(event) => onEvent({ event, eventName: 'header-click' })}>header</button>
    ),
    cell: ({ cellValue, row, extraData, onEvent, index }) =>
      cellValue >= 30 ? (
        <input type="text" onChange={(event) => onEvent({ event, eventName: 'input-event' })} />
      ) : (
        cellValue
      ),
  },
]

root.render(
  <DataTable
    columns={columns}
    data={data}
    onEvent={(e) => console.log(e)}
    pagination={{ page: 1, paginationSize: 4, totalSize: 10, sizePerPage: 2, showTotal: true }}
  />,
)
