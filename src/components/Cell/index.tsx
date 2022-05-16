import React from 'react'
import { CellEvent, CellProps } from '../../@types'
import { getProperty } from '../../utils'

function Cell(props: CellProps) {
  const { row, cell, fieldName, cellClassName, extraData, dataIndex, handleEvent } = props
  const cellValue = getProperty(row, fieldName)

  function onEvent({ event, eventName }: CellEvent) {
    handleEvent({ event, eventName, cellValue, row, fieldName, index: dataIndex })
  }

  function renderCustomCell() {
    return cell ? cell({ cellValue, row, extraData, onEvent, index: 0 }) : null
  }

  return (
    <td
      className={
        cellClassName ? cellClassName({ cellValue, row, extraData, index: dataIndex }) : ''
      }
    >
      {cell ? renderCustomCell() : cellValue}
    </td>
  )
}

export default React.memo(Cell)
