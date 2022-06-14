import React from 'react'
import { CellEvent, Column, OnEventParams } from '../../@types'

interface IProps extends Column {
  handleEvent: (params: Omit<OnEventParams, 'extraData' | 'row' | 'cellValue'>) => void
  index: number
}

function Th(props: IProps) {
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
    handleEvent({ event, eventName, fieldName, index })
  }

  function onFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleEvent({ event, eventName: 'filter', fieldName, index, filterValue: event.target.value })
  }

  return (
    <div className={'thead-th ' + headerClassName} style={headerStyle}>
      {header ? (
        header({ onEvent, index, extraData })
      ) : (
        <>
          <span>{text}</span>
          {props.filter && !props.filter.customRenderer ? (
            <input
              type={props.filter.type || 'text'}
              onChange={onFilterChange}
              placeholder={props.filter.placeholder || ''}
            />
          ) : null}
          {props.filter && props.filter.customRenderer
            ? props.filter.customRenderer({ onEvent, extraData, index })
            : null}
        </>
      )}
    </div>
  )
}

export default React.memo(Th)
