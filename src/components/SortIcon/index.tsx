import React from 'react'
import SortIconSvg from '../../assets/sort.svg'
import SortUpIconSvg from '../../assets/sort-up.svg'
import SortDownIconSvg from '../../assets/sort-down.svg'
import { SortOrder } from '../../@types'

interface Props {
  sortOrder: SortOrder | undefined
}

export function SortIcon({ sortOrder }: Props) {
  if (sortOrder === 'asc') {
    return <img className="sort-icon" src={SortUpIconSvg} />
  }

  if (sortOrder === 'desc') {
    return <img className="sort-icon" src={SortDownIconSvg} />
  }

  return <img className="sort-icon" src={SortIconSvg} />
}
