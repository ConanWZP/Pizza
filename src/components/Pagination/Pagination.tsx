import React, {FC} from 'react';
import styles from './Pagination.module.scss'
import ReactPaginate from "react-paginate";
import {useAppDispatch, useAppSelector} from "../../hooks";
import { setCurrentPage } from '../../redux/reducers/filterSlice';

interface PaginationProps {
    currentPage: number,
    /*setCurrentPage: (e: number) => void,*/
    totalPages: number
}

const Pagination:FC<PaginationProps> = ({ totalPages}) => {

    const dispatch = useAppDispatch()
    const {currentPage} = useAppSelector(state => state.filter)


    return (
        <div >
            <ReactPaginate className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                           forcePage={currentPage-1}
                previousLabel="<"
                renderOnZeroPageCount={null || undefined}

            />
        </div>
    );
};

export default Pagination;