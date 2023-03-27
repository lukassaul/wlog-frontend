import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }: any) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div className="tableFooter">
      {range.length > 1 && range.map((el: any, index: number) => (
        <button
          key={index}
          className={`tf-button ${
            page === el ? 'tf-activeButton' : 'tf-inactiveButton'
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;