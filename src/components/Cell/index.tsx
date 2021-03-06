import React, { useEffect, useState } from 'react'
import { CellEvent, CellProps } from '../../@types'
import { getProperty } from '../../utils'

function Cell(props: CellProps) {
  const {
    row,
    cell,
    format,
    fieldName,
    cellClassName,
    extraData,
    dataIndex,
    editable,
    handleEvent,
    cellStyle = {},
  } = props
  const [editing, setEditing] = useState(false)
  const cellValue = getProperty(row, fieldName)
  const [value, setValue] = useState(format ? format(cellValue, row, extraData) : cellValue)

  function onEvent({ event, eventName }: CellEvent) {
    handleEvent({ event, eventName, cellValue: value, row, fieldName, index: dataIndex })
  }

  function renderCustomCell() {
    return cell ? cell({ cellValue: value, row, extraData, onEvent, index: 0 }) : null
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

  useEffect(() => {
    setValue(format ? format(cellValue, row, extraData) : cellValue)
  }, [cellValue])

  return (
    <div
      className={
        `cell ${editable ? 'editable' : ''}` +
        (cellClassName ? cellClassName({ cellValue, row, extraData, index: dataIndex }) : '')
      }
      onDoubleClick={toggleEditing}
      title={editable ? 'Duplo clique para editar a célula' : ''}
      style={cellStyle}
    >
      {cell ? renderCustomCell() : null}
      {!cell ? (
        editing ? (
          <input
            type="text"
            className="edit-input"
            value={value}
            onChange={onEditing}
            onBlur={onEditingBlur}
          />
        ) : (
          value
        )
      ) : null}
    </div>
  )
}

export default React.memo(Cell)
