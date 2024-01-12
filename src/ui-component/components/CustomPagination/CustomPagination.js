import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CustomPagination = (props) => {

    const getPageRange = () => {
        let end = props.page * 10
        let start = props.totalCount === 0 ? 0 : (end - 10) + 1
        if (end > props.totalCount) {
            end = props.totalCount
        }
        return { start, end }
    }

    let { start, end } = getPageRange()

    const handleNextPage = () => () => {
        if (end < props.totalCount) {
            let currPage = props.page + 1
            props.paginationHandler(currPage)
            props.setPage(currPage);
        }
    }

    const handlePrevPage = () => () => {
        if (props.page > 1) {
            let currPage = props.page - 1
            props.paginationHandler(currPage)
            props.setPage(currPage);
        }
    }


    return (
        <div>
            {props.loader ? <div style={{ float: 'left', marginTop: '5px' }}> Loading...</div> :
                <div style={{ float: 'left', marginTop: '5px' }}>
                    {`Showing ${start} to ${end} of ${props.totalCount} results`}
                </div>}
            <div style={{ float: 'right' }} className="btn-group" role="group">
                <div style={(props.page === 1) ? { opacity: '0.4', cursor: 'not-allowed' } : {}} onClick={handlePrevPage()}>
                    <ChevronLeftIcon className="pagination-btn" />
                </div>
                <div style={(end === props.totalCount) ? { opacity: '0.4', cursor: 'not-allowed' } : {}} onClick={handleNextPage()}>
                    <ChevronRightIcon className="pagination-btn" />
                </div>
            </div>
        </div >
    )
}

export default CustomPagination