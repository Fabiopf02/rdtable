import React from 'react'
import { CellEvent, Column, OnEventParams } from '../../@types'

interface Props extends Column {
  handleEvent: (params: Omit<OnEventParams, 'extraData' | 'row' | 'cellValue'>) => void
  index: number
}

function Th(props: Props) {
  const {
    text,
    headerClassName,
    handleEvent,
    fieldName,
    header,
    extraData,
    index,
    headerStyle = {},
  } = props
  function onEvent({ event, eventName }: CellEvent) {
    handleEvent({ event, eventName, fieldName, index: 0 })
  }

  return (
    <th className={headerClassName} style={headerStyle}>
      {header ? (
        header({ onEvent, index, extraData })
      ) : (
        <>
          {text}
          {props.filter ? props.filter : null}
        </>
      )}
    </th>
  )
}

export default React.memo(Th)
