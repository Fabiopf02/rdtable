import React from 'react'

type Props = {
  children: React.ReactNode
  style: React.CSSProperties
}

function TableWrapper({ children, style }: Props) {
  return (
    <div className="rdtable" style={style}>
      {children}
    </div>
  )
}

export default React.memo(TableWrapper)
