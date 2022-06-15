import React from 'react'
import Cell from '../Cell'
import type { Props } from '../TableBody'

interface IProps extends Omit<Props, 'data'> {
  dataIndex: number
  row: any
}

export function Row(props: IProps) {
  const { extraData, handleEvent, rowStyle, bordered, hover, striped, columns, dataIndex, row } =
    props
  return (
    <div
      className={`row ${hover ? 'hover' : ''} ${bordered ? 'bordered' : ''} ${
        striped ? 'striped' : ''
      }`}
      key={dataIndex}
      style={rowStyle}
    >
      {columns.map((column, index) => (
        <Cell
          key={index}
          {...column}
          extraData={extraData}
          dataIndex={dataIndex}
          handleEvent={handleEvent}
          row={row}
        />
      ))}
    </div>
  )
}
