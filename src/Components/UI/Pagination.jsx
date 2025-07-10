import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({totalPages, page, setPage}) => {
    return (
          <div className="flex justify-center mt-6 gap-2 items-center flex-wrap">
                  <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <FaAngleLeft />
                  </button>
        
                  {[...Array(totalPages).keys()].map((num) => {
                    const pageNum = num + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`rounded-full size-8 flex justify-center items-center border border-gray-300 text-sm font-medium 
                          ${page === pageNum ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"}
                        `}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
        
                  <button
                    className="btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <FaAngleRight />
                  </button>
                </div>
    );
};

export default Pagination;