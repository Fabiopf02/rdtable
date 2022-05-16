import React from 'react'
import { PaginationProps } from '../../@types';
import { getPagination } from './util';

function Pagination(props: PaginationProps) {
  const { page, totalSize, sizePerPage, paginationSize, paginationTotalComponent, showTotal } = props
  const pages = Math.ceil(totalSize / sizePerPage);
  const count = page * sizePerPage - sizePerPage + 1;
  const delimiter = count + sizePerPage;
  const to = delimiter > totalSize ? totalSize : delimiter
  const pagination = getPagination(paginationSize, page, totalSize)
  return (
    <div className='react-dtable-pagination'>
      {paginationTotalComponent ? paginationTotalComponent(count, to, totalSize) : <p>Exibindo {count} até {to} de {totalSize}</p>}
      <div className='pages'>
        {pagination.map((value, index) => (
          <button key={value + '' + index} className="page-item">{value}</button>
        ))}
      </div>
    </div>
  )
}

Pagination.defaultProps = {
  showTotal: true,
  remote: false,
  paginationSize: 6,
}

export default React.memo(Pagination)
