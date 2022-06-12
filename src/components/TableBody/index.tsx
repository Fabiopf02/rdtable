import React from 'react'
import Cell from '../Cell'
import { Column, OnEventParams } from '../../@types'
import { isObject } from '../../utils'

interface Group<T = any> {
  type: 'objects' | 'arrays'
  customTitleRenderer?: (title: string, groupData: T[]) => React.ReactNode
}

type Props = {
  columns: Column[]
  extraData?: any
  handleEvent: (params: Omit<OnEventParams, 'extraData'>) => void
  style: React.CSSProperties
  rowStyle: React.CSSProperties
  data: any[]
  /**
   * - for `type='objects'` `data` must be of type `{'title': [{...}, ...], ...}`
   * - for `type='arrays'` `data` must be of type `[[{...}, ...], ...]`
   */
  group?: Group
}

function TBody(props: Props) {
  const { columns, data, handleEvent, extraData, style, rowStyle, group } = props

  function renderData(_data: any[]) {
    return _data.map((row, dataIndex) => (
      <div className="row" key={dataIndex} style={rowStyle}>
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
    ))
  }

  function renderGroupWithObjects() {
    if (!group || JSON.stringify(data) === '[]') return null
    if (!isObject(data))
      throw new Error("for `type='objects'` `data` must be of type `{'title': [{...}, ...], ...}")

    const _data = Object.entries(data)
    const { customTitleRenderer } = group
    return _data.map(([title, rows], index) => (
      <div className={`group group-${index}`} key={title}>
        <div className="group-title">
          {customTitleRenderer ? customTitleRenderer(title, rows) : title}
        </div>
        {renderData(rows)}
      </div>
    ))
  }

  if (group) {
    return (
      <div className="rdtable-body" style={style}>
        {renderGroupWithObjects()}
      </div>
    )
  }

  return (
    <div className="rdtable-body" style={style}>
      {renderData(data)}
    </div>
  )
}

export default React.memo(TBody)
