type PaginationProps = {
  totalPages: number;
  currentPage: number;
  elementsPerPage: number;
  onChangePage: (pageNum: number) => void;
  onChangeElementsPerPage: (num: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  elementsPerPage,
  onChangePage,
  onChangeElementsPerPage,
  totalPages,
}) => {
  const numOfPages = totalPages;

  const prevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 0) prevPage = numOfPages;
    onChangePage(prevPage);
  };

  const nextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > numOfPages) nextPage = numOfPages;
    onChangePage(nextPage);
  };

  const addPageButton = ({
    pageNum,
    activeClass,
  }: {
    pageNum: number;
    activeClass: boolean;
  }) => (
    <button
    className=" rounded-xl"
      key={pageNum}
      style={{
        padding: "0.75rem 1rem",
        fontSize: "14px",
        backgroundColor: activeClass ? "#0077cc" : "transparent",
        color: activeClass ? "#FFFFFF" : "#B2B1B4",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => onChangePage(pageNum)}
    >
      {pageNum+1}
    </button>
  );

  const renderPageButton = () => {
    const pagesButtons: React.ReactNode[] = [];

    if (numOfPages <= 5) {
      for (let i = 0; i < numOfPages; i++) {
        pagesButtons.push(
          addPageButton({ pageNum: i, activeClass: currentPage === i }),
        );
      }
    } else {
      pagesButtons.push(
        addPageButton({ pageNum: 1, activeClass: currentPage === 1 }),
      );

      if (currentPage > 3) {
        pagesButtons.push(
          <span key="dots-1" style={{ margin: "0 0.5rem" }}>
            ...
          </span>,
        );
      }

      if (currentPage > 2 && currentPage < numOfPages - 1) {
        pagesButtons.push(
          addPageButton({ pageNum: currentPage - 1, activeClass: false }),
        );
      }

      if (currentPage !== 1 && currentPage !== numOfPages) {
        pagesButtons.push(
          addPageButton({ pageNum: currentPage, activeClass: true }),
        );
      }

      if (currentPage < numOfPages - 1) {
        pagesButtons.push(
          addPageButton({ pageNum: currentPage + 1, activeClass: false }),
        );
      }

      if (currentPage < numOfPages - 2) {
        pagesButtons.push(
          <span key="dots-2" style={{ margin: "0 0.5rem" }}>
            ...
          </span>,
        );
      }

      pagesButtons.push(
        addPageButton({
          pageNum: numOfPages,
          activeClass: currentPage === numOfPages,
        }),
      );
    }

    return pagesButtons;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1.5rem",
        color: "#1A202C",
      }}
      className="bg-[#daeafb] mt-4 rounded-lg"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="font-semibold">
        <label htmlFor="elementsPerPage" style={{ fontSize: "14px" }}>
          Show
        </label>
        <select
          id="elementsPerPage"
          style={{
            padding: "0.75rem",
            outline: "none",
          }}
          className="rounded-xl"
          value={elementsPerPage}
          onChange={e => onChangeElementsPerPage(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <label htmlFor="elementsPerPage" style={{ fontSize: "14px" }}>
          Rows
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          style={{
            visibility: currentPage === 0 ? "hidden" : "visible",
            border: "none",
            cursor: "pointer",
          }}
          onClick={prevPage}
          className="px-3 py-2 rounded-lg bg-white"
        >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#0077cc"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
        </button>
        {renderPageButton()}

        <button
          style={{
            visibility: currentPage === numOfPages-1 ? "hidden" : "visible",
            border: "none",
            cursor: "pointer",
          }}
          onClick={nextPage}
          className="px-3 py-2 rounded-lg bg-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#0077cc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
