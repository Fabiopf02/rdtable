import React, { useState } from 'react'
import { PaginationProps } from '../../@types'
import { getPagination } from './util'
import { getFromToPaging } from '../../utils'

function Pagination(props: PaginationProps) {
  const {
    page,
    totalSize,
    sizePerPage,
    paginationSize,
    paginationTotalRenderer,
    sizePerPageList,
    showTotal,
    containerStyle,
    remote,
    changePaginate,
  } = props
  const [currentPage, setCurrentPage] = useState(page)
  const [currentSizePerPage, setCurrentSizePerPage] = useState(sizePerPage)
  const pages = Math.ceil(totalSize / currentSizePerPage)
  const { from, to } = getFromToPaging(currentPage, currentSizePerPage, totalSize)
  const pagination = getPagination(paginationSize, currentPage, totalSize, pages)

  function handlePagination(event: any, currentPage: number, index: number, perPage = sizePerPage) {
    setCurrentPage(currentPage)
    setCurrentSizePerPage(perPage)
    if (!remote) {
      return changePaginate({ page: currentPage, sizePerPage: perPage, totalSize })
    }
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
    if (currentPage <= 1) return
    handlePagination(event, currentPage - 1, 0)
  }
  function handleNextPage(event: any) {
    if (currentPage >= pages) return
    handlePagination(event, currentPage + 1, 0)
  }

  function onChangeSizePerPage({
    event = null,
    newSizePerPage,
  }: {
    newSizePerPage: number
    event?: any
  }): any {
    handlePagination(event, currentPage, 0, newSizePerPage)
  }

  function renderSizePerPageList() {
    return (
      <div className="per-page">
        <span>Registros Por Página:</span>
        <select
          value={currentSizePerPage}
          onChange={(event) =>
            onChangeSizePerPage({ event, newSizePerPage: Number(event.target.value) })
          }
        >
          {sizePerPageList!.map((size: number) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    )
  }

  function renderPageButton(value: string | number, index: number) {
    return (
      <button
        key={value + '' + index}
        disabled={value === '...' || value === currentPage}
        className={`page-item page-index-${currentPage} ${value === currentPage ? 'active' : ''}`}
        onClick={(event) => handlePagination(event, Number(value), index)}
      >
        {value}
      </button>
    )
  }

  return (
    <div className="rdtable-pagination" style={containerStyle}>
      {paginationTotalRenderer ? paginationTotalRenderer(from, to, totalSize) : null}
      {!paginationTotalRenderer && showTotal ? (
        <p>
          Exibindo {from + 1} até {to} de {totalSize}
        </p>
      ) : null}
      {props.customSizePerPageRenderer
        ? props.customSizePerPageRenderer({ onChangeSizePerPage })
        : renderSizePerPageList()}
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
  page: 1,
  sizePerPage: 10,
  paginationSize: 6,
  sizePerPageList: [10, 25, 30, 50],
}

export default React.memo(Pagination)
