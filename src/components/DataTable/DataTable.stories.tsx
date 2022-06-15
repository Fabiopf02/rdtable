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
  { user: { id: 4, name: 'Joe', age: 32 } },
  { user: { id: 5, name: 'Joe', age: 32 } },
  { user: { id: 6, name: 'Joe', age: 32 } },
  { user: { id: 7, name: 'Joe', age: 32 } },
  { user: { id: 8, name: 'Joe', age: 32 } },
  { user: { id: 9, name: 'Joe', age: 32 } },
  { user: { id: 10, name: 'Joe', age: 32 } },
  { user: { id: 11, name: 'Joe', age: 32 } },
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
    filter: { type: 'text', placeholder: 'Filtrar por nome...' },
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
  hover: true,
  bordered: true,
  onEvent: (e) => console.log(e),
  tableWrapperStyle: {
    width: '100%',
  },
  pagination: {
    page: 1,
    paginationSize: 4,
    totalSize: data.length,
    sizePerPage: 3,
    showTotal: true,
  },
  remote: { filter: false },
}

const groupedData = {
  'Título teste 1': [
    { name: 'Teste 1', group: 'Grupo teste 1' },
    { name: 'Teste 2', group: 'Grupo teste 1' },
  ],
  'Título teste 2': [
    { name: 'Teste 3', group: 'Grupo teste 2' },
    { name: 'Teste 4', group: 'Grupo teste 2' },
  ],
}

export const Group = Template.bind({})
Group.args = {
  columns: [
    { text: 'Name', fieldName: 'name' },
    { text: 'Group', fieldName: 'group' },
  ],
  data: groupedData,
  group: {
    type: 'objects',
    customTitleRenderer: (t: string, g: any[]) => {
      return <h3>{t.toUpperCase()}</h3>
    },
  },
  onEvent: (e) => console.log(e),
  tableWrapperStyle: {
    width: '100%',
  },
  pagination: {
    page: 1,
    paginationSize: 4,
    totalSize: data.length,
    sizePerPage: 3,
    showTotal: true,
  },
}
