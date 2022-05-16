import React from 'react'

type Props = {
  children: React.ReactNode
}

function TableWrapper({ children }: Props) {
  return <table className='react-dtable'>{children}</table>
}

export default React.memo(TableWrapper)
