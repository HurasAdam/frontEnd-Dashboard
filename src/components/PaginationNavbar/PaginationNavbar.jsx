import "../PaginationNavbar/paginationNavbar.css";

export const PaginationNavbar = ({
  pageState,
  handleSelectPage,
  setPageState,
  theme,
  max,
}) => {
  const prev = pageState.page <= 1 || max <= 1;
  const next = max <= 1 || pageState.page === max;

  return (
    <div className="paginationActionContainer" id={theme.mode}>
      <div className="paginationAction__btns">
        <button
          onClick={() => handleSelectPage(pageState.page + 1)}
          className={`${next}`}
          disabled={next}
        >
          Next
        </button>
        <button
          onClick={() => handleSelectPage(pageState.page - 1)}
          className={`${prev}`}
          disabled={prev}
        >
          Prev
        </button>
        {pageState && (
          <span>
            Page:{pageState.page}of {pageState.total}
          </span>
        )}
      </div>
      <div className="pagination_customizeContainer">
        <span>per page</span>
        <select
          onChange={(e) =>
            setPageState({ ...pageState, pageSize: e.target.value })
          }
          name=""
          id=""
          value={pageState?.pageSize}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
       
          
        </select>
      </div>
    </div>
  );
};
