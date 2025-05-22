import { Link } from "react-router-dom";

export default function Paginator({ route, params, resultsCount }) {
    const searchParams = [...params].reduce((acc, [key, value]) => { acc[key] = value; return acc; }, {});

    const currentPage = Number.parseInt(searchParams.page) || 1;
    const resultsPerPage = 32;
    const pageCount = Math.ceil(resultsCount/resultsPerPage);

    const getSearchParams = pageNumber => {
        const newParams = new URLSearchParams();
        if (pageNumber > 1) {
            newParams.append("page", pageNumber)
        }
        if (searchParams.q) {
            newParams.append("q", searchParams.q);
        }
        if (searchParams.topic) {
            newParams.append("topic", searchParams.topic);
        }
        if (searchParams.languages) {
            newParams.append("languages", searchParams.languages)
        }
        return newParams;
    }

    const getSearchLink = pageNumber => {
        return <Link to={`${route}?${getSearchParams(pageNumber).toString()}`}>{pageNumber}</Link>
    }
    
    const paginatorCSS = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    }

    return (
        <div style={paginatorCSS}>
            <p>Results pages:</p>
            {
                currentPage > 1 ? [
                    <Link key={0} to={`${route}?${getSearchParams(1).toString()}`}>First</Link>,
                    <Link key={1} to={`${route}?${getSearchParams(currentPage - 1).toString()}`}>Prev</Link>
                ] : []
            }
            {
                currentPage > 5 ? (<p>...</p>) : (<></>)
            }
            {
                new Array(4).fill(0).map((x, index) => currentPage - 4 + index).filter(x => x > 0).map((page, index) => (
                    <Link key={index} to={`${route}?${getSearchParams(page)}`}>{page}</Link>
                ))
            }
            <p>{currentPage}</p>
            {
                new Array(4).fill(0).map((x, index) => currentPage + index + 1).filter(x => x <= pageCount).map((page, index) => (
                    <Link key={index} to={`${route}?${getSearchParams(page)}`}>{page}</Link>
                ))
            }
            {
                currentPage < pageCount - 4 ? (<p>...</p>) : (<></>)
            }
            {
                currentPage < pageCount ? [
                    <Link key={0} to={`${route}?${getSearchParams(currentPage + 1).toString()}`}>Next</Link>,
                    <Link key={1} to={`${route}?${getSearchParams(pageCount).toString()}`}>Last</Link>
                ] : []
            }
        </div>
    )
}