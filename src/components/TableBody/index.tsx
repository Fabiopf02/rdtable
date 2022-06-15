import React from 'react'
import { Column, OnEventParams } from '../../@types'
import { isObject } from '../../utils'
import { Group } from '../Group'
import { Row } from '../Row'

interface IGroup<T = any> {
  type: 'objects' | 'arrays'
  customTitleRenderer?: (title: string, groupData: T[]) => React.ReactNode
}

export interface Props {
  columns: Column[]
  extraData?: any
  handleEvent: (params: Omit<OnEventParams, 'extraData'>) => void
  style: React.CSSProperties
  rowStyle: React.CSSProperties
  data: any[]
  hover?: boolean
  bordered?: boolean
  striped?: boolean
  /**
   * - for `type='objects'` `data` must be of type `{'title': [{...}, ...], ...}`
   * - for `type='arrays'` `data` must be of type `[[{...}, ...], ...]`
   */
  group?: IGroup
}

function TBody(props: Props) {
  const { data, style, group } = props
  function renderData(_data: any[]) {
    return _data.map((row, dataIndex) => (
      <Row key={dataIndex} {...props} row={row} dataIndex={dataIndex} />
    ))
  }

  function renderGroupWithObjects() {
    if (!group || JSON.stringify(data) === '[]') return null
    if (!isObject(data))
      throw new Error("for `type='objects'` `data` must be of type `{'title': [{...}, ...], ...}")

    const _data = Object.entries(data)
    return _data.map(([title, rows], index) => (
      <Group key={title + index} group={group} index={index} title={title} rows={rows}>
        <>{renderData(rows)}</>
      </Group>
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
