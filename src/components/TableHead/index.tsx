import React from 'react'
import Th from '../Th'
import { THeaderProps } from '../../@types'

function TableHead(props: THeaderProps) {
  const { columns, extraData, handleEvent, style } = props
  return (
    <div className="rdtable-thead" style={style}>
      {columns.map((column, index) => (
        <Th key={index} {...column} extraData={extraData} handleEvent={handleEvent} index={index} />
      ))}
    </div>
  )
}

export default React.memo(TableHead)
