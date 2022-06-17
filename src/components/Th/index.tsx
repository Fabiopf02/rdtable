import React from 'react'
import { CellEvent, Column, OnEventParams, SortOrder } from '../../@types'
import { SortIcon } from '../SortIcon'

interface IProps extends Column {
  handleEvent: (params: Omit<OnEventParams, 'extraData' | 'row' | 'cellValue'>) => void
  index: number
}

function Th(props: IProps) {
  const [sortOrder, setSortOrder] = React.useState<SortOrder | undefined>()
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

  function onChangeSortOrder(event: React.MouseEvent<HTMLDivElement>) {
    if (!props.sortable) return
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
    handleEvent({ event, eventName: 'sort', fieldName, index, sortOrder: newSortOrder })
  }

  return (
    <div
      className={'thead-th hover ' + headerClassName}
      style={headerStyle}
      onClick={onChangeSortOrder}
    >
      <div className="thead-th-content">
        {header ? (
          header({ onEvent, index, extraData })
        ) : (
          <>
            <span>{text}</span>
            {props.filter && !props.filter.customRenderer ? (
              // @ts-ignore
              <input
                type={props.filter.type || 'text'}
                className="filter-input"
                {...props.filter}
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
      {props.sortable && <SortIcon sortOrder={sortOrder} />}
    </div>
  )
}

export default React.memo(Th)
