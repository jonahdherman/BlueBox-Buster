import React from "react";

const NonVipPagination = ({ totalProducts, productsPerPage, setCurrentPage, currentPage, totalPages }) => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const nextPage = (event) => {
        if(currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const prevPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage -1);
        }
    }

    return (
        <div>
            <div className='pagination'>
                <button onClick={prevPage}>{'<'}</button>
                {pages.map((page, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                            className={page == currentPage ? "active" : ""}>
                            {page}
                        </button>
                    );
                })}
                <button onClick={nextPage}>{'>'}</button>
            </div>
        </div>
    );
};

export default NonVipPagination;