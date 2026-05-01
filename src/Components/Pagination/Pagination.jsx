import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center gap-2 bg-white shadow-lg rounded-full px-5 py-2">

        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-9 h-9 rounded-full border disabled:opacity-40"
        >
          ‹
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-9 h-9 rounded-full transition
            ${
              currentPage === i + 1
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 rounded-full border disabled:opacity-40"
        >
          ›
        </button>

      </div>
    </div>
  );
}
