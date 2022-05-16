import React from 'react'
import Cell from '../Cell'
import { Column, OnEventParams } from '../../@types'

type Props = {
  columns: Column[]
  extraData?: any
  handleEvent: (params: Omit<OnEventParams, 'extraData'>) => void
  data: any[]
}

function TBody(props: Props) {
  const { columns, data, handleEvent, extraData } = props
  return (
    <tbody>
      {data.map((row, dataIndex) => (
        <tr key={dataIndex}>
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
        </tr>
      ))}
    </tbody>
  )
}

export default React.memo(TBody)
