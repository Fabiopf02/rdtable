import React from 'react'
import { Group as IGroup } from '../../@types'

interface Props {
  index: number
  children: React.ReactElement
  title: string
  group: IGroup
  rows: any[]
}

export function Group({ rows, children, title, group, index }: Props) {
  const { expanded } = group
  const { customTitleRenderer } = group
  const [isExpanded, setIsExpanded] = React.useState(expanded !== undefined ? !!expanded : true)
  function toggleIsOpen() {
    if (!group.expandable) return
    setIsExpanded((oldValue: boolean) => !oldValue)
  }

  return (
    <div className={`group group-${index}`} key={title}>
      <div className="group-title" onClick={toggleIsOpen}>
        {customTitleRenderer ? customTitleRenderer(title, rows) : title}
      </div>
      {isExpanded ? children : null}
    </div>
  )
}
