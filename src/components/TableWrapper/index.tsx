import React from 'react'

type Props = {
  children: React.ReactNode
  style: React.CSSProperties
}

function TableWrapper({ children, style }: Props) {
  return (
    <table className="rdtable" style={style}>
      {children}
    </table>
  )
}

export default React.memo(TableWrapper)
