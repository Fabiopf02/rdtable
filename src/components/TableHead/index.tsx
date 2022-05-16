import React from 'react'
import Th from '../Th'
import { THeaderProps } from '../../@types'

function TableHead(props: THeaderProps) {
  const { columns, extraData, handleEvent } = props
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <Th key={index} {...column} extraData={extraData} handleEvent={handleEvent} index={index} />
        ))}
      </tr>
    </thead>
  )
}

export default React.memo(TableHead)
