import React from "react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = []
  const maxPagesToShow = 5

  return <div>Pagination</div>
}

export default Pagination
