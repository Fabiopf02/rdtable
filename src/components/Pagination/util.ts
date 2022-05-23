const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, i) => i + start)

export function getPagination(count: number, page: number, total: number, maxPage: number) {
  const { min, max, floor } = Math
  const start = max(1, min(page - floor((count - 4) / 2), total - count + 2))
  const end = min(maxPage, max(page + floor((count - 2) / 2), count - 1))
  return [
    ...(start > 2 ? [1, '...'] : start > 1 ? [1] : []),
    ...range(start, end + 1),
    ...(end < maxPage - 1 ? ['...', maxPage] : end < maxPage ? [maxPage] : []),
  ]
}
