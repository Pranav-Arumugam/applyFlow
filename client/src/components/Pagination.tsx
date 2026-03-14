import React from "react"
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const pages = []
  const maxPagesToShow = 5

  return <div>Pagination</div>
}

export default Pagination
