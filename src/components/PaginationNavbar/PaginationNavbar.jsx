import "../PaginationNavbar/paginationNavbar.css";

export const PaginationNavbar = ({
  pageState,
  handleSelectPage,
  theme,
  max,
}) => {
  const prev = pageState.page <= 1 || max <= 1;
  const next = max <= 1 || pageState.page === max;

  console.log({ pageState });
  return (
    <div className="paginationActionContainer" id={theme.mode}>
      <button
        onClick={(e) => handleSelectPage((prev) => prev.page + 1)}
        className={`${next}`}
        disabled={next}
      >
        Next
      </button>
      <button 
      onClick={(e)=>handleSelectPage((prev)=>prev.page-1)}
      className={`${prev}`} disabled={prev}>
        Prev
      </button>
      {pageState && (
        <span>
          Page:{pageState.page}of {pageState.total}
        </span>
      )}
    </div>
  );
};
