import React, {ChangeEvent, FC, useCallback, useRef, useState} from 'react';
import styles from './Search.module.scss'
import {useDebounce} from "../../hooks/useDebounce";
import debounce from 'lodash.debounce';
import {useAppDispatch} from "../../hooks";
import { setSearchValue } from '../../redux/reducers/filterSlice';

interface SearchProps {
    searchValue: string,
    setSearchValue: (e: string) => void,
}


const Search: FC = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    //const {setSearchValue} = useContext<any>(AppContext)

    const inputSearch = useRef<HTMLInputElement>(null)
    const onClearField = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputSearch.current?.focus()
    }

    /*const testDebounce = React.useCallback(
        debounce(() => {
            console.log('HELLO!!!!')
        }, 1000)
    , [],)*/

    const updateSearchValue = useDebounce((str: any) => {
        console.log('hello')
        dispatch(setSearchValue(str))
    }, 1000)

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    /*const updateSearchValue = useCallback(
        debounce((str) => {
            console.log(str)
            dispatch(setSearchValue(str))
        }, 1000), []
    )*/


    return (
        <div className={styles.search}>

            <svg className={styles.icon}
                 enableBackground="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50"
                 width="50px" xmlns="http://www.w3.org/2000/svg"
            >
                <rect fill="none" height="50" width="50"/>
                <circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round"
                        strokeMiterlimit="10" strokeWidth="2"/>
                <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5"
                      y1="32.229" y2="45.5"/>
            </svg>
            <input ref={inputSearch} value={value} onChange={onChangeInput}
                   className={styles.input} placeholder={'Поиск товаров...'}/>
            {
                value &&
                <svg onClick={onClearField} className={styles.closeIcon} height="512px" id="Layer_1"  version="1.1"
                     viewBox="0 0 512 512" width="512px"  xmlns="http://www.w3.org/2000/svg"
                ><path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
            }


        </div>

    );
};

export default Search;