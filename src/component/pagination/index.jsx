import React from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return (
    <div>
      {totalCount < 10 ? (
        <div></div>
      ) : (
        <div className="flex justify-end items-center mt-4 mb-7">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded"
          >
            Previous
          </button>
          <span className="px-4">{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
