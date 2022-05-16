import React, { useState } from 'react'
import { CellEvent, CellProps } from '../../@types'
import { getProperty } from '../../utils'

function Cell(props: CellProps) {
  const { row, cell, fieldName, cellClassName, extraData, dataIndex, editable, handleEvent } = props
  const [editing, setEditing] = useState(false)
  const cellValue = getProperty(row, fieldName)
  const [value, setValue] = useState(cellValue)

  function onEvent({ event, eventName }: CellEvent) {
    handleEvent({ event, eventName, cellValue, row, fieldName, index: dataIndex })
  }

  function renderCustomCell() {
    return cell ? cell({ cellValue, row, extraData, onEvent, index: 0 }) : null
  }

  function toggleEditing() {
    if (!editable) return
    setEditing(!editing)
  }

  function onEditing(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setValue(value)
  }

  function onEditingBlur(event: React.FocusEvent<HTMLInputElement>) {
    handleEvent({
      event,
      eventName: 'cell-edit',
      cellValue: value,
      row,
      fieldName,
      index: dataIndex,
    })
    toggleEditing()
  }

  return (
    <td
      className={
        cellClassName ? cellClassName({ cellValue, row, extraData, index: dataIndex }) : ''
      }
      onDoubleClick={toggleEditing}
    >
      {cell ? renderCustomCell() : null}
      {!cell ? (
        editing ? (
          <input type="text" value={value} onChange={onEditing} onBlur={onEditingBlur} />
        ) : (
          value
        )
      ) : null}
    </td>
  )
}

export default React.memo(Cell)
