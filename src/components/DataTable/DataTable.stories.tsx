import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import DataTable from '.'
import { Column } from '../../@types'

export default {
  title: 'Example/DataTable',
  component: DataTable,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DataTable>

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />

const data = [
  { user: { id: 1, name: 'John', age: 30 } },
  { user: { id: 2, name: 'Jane', age: 28 } },
  { user: { id: 3, name: 'Joe', age: 32 } },
]

const columns: Column[] = [
  {
    text: 'ID',
    fieldName: 'user.id',
  },
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
    cell: ({ cellValue, onEvent }) =>
      cellValue >= 30 ? (
        <input type="text" onChange={(event) => onEvent({ event, eventName: 'input-event' })} />
      ) : (
        cellValue
      ),
  },
]

export const Simple = Template.bind({})
Simple.args = {
  columns,
  data,
}
export const Full = Template.bind({})
Full.args = {
  columns,
  data,
  onEvent: (e) => console.log(e),
  tableWrapperStyle: {
    width: '100%',
  },
  pagination: {
    page: 1,
    paginationSize: 4,
    totalSize: 10,
    sizePerPage: 2,
    showTotal: true,
  },
}
