
import '../PaginationNavbar/paginationNavbar.css'

export const PaginationNavbar=({pageState,handleSelectPage,theme})=>{

    const prev = pageState.page <= 1 || pageState.total <= 1;
    const next = pageState.total <= 1 || pageState.page === pageState.total;
  

    return(
        <div className="paginationActionContainer" id={theme.mode}>
        <button onClick={(e)=>handleSelectPage(e,pageState.page+1)}
          className={`${next}`}
          disabled={next}
       
        >
          Next
        </button>
        <button
        onClick={(e)=>handleSelectPage(e,pageState.page-1)}
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
    )
}