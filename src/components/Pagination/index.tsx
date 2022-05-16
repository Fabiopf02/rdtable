import React from 'react'
import { PaginationProps } from '../../@types'
import { getPagination } from './util'

function Pagination(props: PaginationProps) {
  const {
    page,
    totalSize,
    sizePerPage,
    paginationSize,
    paginationTotalComponent,
    sizePerPageList,
    showTotal,
  } = props
  const pages = Math.ceil(totalSize / sizePerPage)
  const count = page * sizePerPage - sizePerPage + 1
  const delimiter = count + sizePerPage
  const to = delimiter > totalSize ? totalSize : delimiter
  const pagination = getPagination(paginationSize, page, totalSize)

  function handlePagination(event: any, currentPage: number, index: number, perPage = sizePerPage) {
    props.handleEvent({
      event,
      eventName: 'pagination',
      currentPage,
      oldPage: page,
      sizePerPage: perPage,
      index,
    })
  }

  function handlePrevPage(event: any) {
    if (page <= 1) return
    handlePagination(event, page - 1, 0)
  }
  function handleNextPage(event: any) {
    if (page >= pages) return
    handlePagination(event, page + 1, 0)
  }

  function onChangeSizePerPageList(event: any) {
    const newSizePerPage = event.target.value
    handlePagination(event, page, 0, Number(newSizePerPage))
  }

  function renderSizePerPageList() {
    return (
      <select value={sizePerPage} onChange={onChangeSizePerPageList}>
        {sizePerPageList.map((size: number) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    )
  }

  function renderPageButton(value: string | number, index: number) {
    return (
      <button
        key={value + '' + index}
        disabled={value === '...' || value === page}
        className={`page-item page-index-${page} ${value === page ? 'active' : ''}`}
        onClick={(event) => handlePagination(event, Number(value), index)}
      >
        {value}
      </button>
    )
  }

  return (
    <div className="react-dtable-pagination">
      {paginationTotalComponent ? paginationTotalComponent(count, to, totalSize) : null}
      {!paginationTotalComponent && showTotal ? (
        <p>
          Exibindo {count} até {to} de {totalSize}
        </p>
      ) : null}
      {renderSizePerPageList()}
      <div className="pages">
        <button onClick={(event) => handlePrevPage(event)}>{'<'}</button>
        {pagination.map(renderPageButton)}
        <button onClick={(event) => handleNextPage(event)}>{'>'}</button>
      </div>
    </div>
  )
}

Pagination.defaultProps = {
  showTotal: true,
  remote: false,
  sizePerPage: 10,
  paginationSize: 6,
  sizePerPageList: [10, 25, 30, 50],
}

export default React.memo(Pagination)
