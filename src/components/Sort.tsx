import React, {FC, useEffect, useRef, useState} from 'react';
import './../scss/app.scss'
import {sortValue} from "../types";
import {useAppDispatch, useAppSelector} from "../hooks";
import {setSelectedSort, sortModel} from '../redux/reducers/filterSlice';

interface SortProps {
    valueSort: sortValue,
    onChangeSort: (id: any) => void
}

interface ExtraProps {
    visible: boolean,
    setVisible: (e: boolean) => void
}

export const sortList: sortModel[] = [
    {name: 'популярности по убыванию', sortProperty: 'rating'},
    {name: 'популярности по возрастанию', sortProperty: '-rating'},
    {name: 'цене по убыванию', sortProperty: 'price'},
    {name: 'цене по возрастанию', sortProperty: '-price'},
    {name: 'алфавиту по убыванию', sortProperty: 'title'},
    {name: 'алфавиту по возрастанию', sortProperty: '-title'},
]

type SortPropsNew = {
    selectedSort: sortModel
}

const Sort: FC<SortPropsNew> = React.memo(({selectedSort}) => {

   // const {selectedSort} = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()
    const [sortVisible, setSortVisible] = useState(false)


    const sortRef = useRef<HTMLDivElement>(null)
    /*const sortList = ['популярности', 'цене', 'алфавиту']*/

    /*const [selectedSort, setSelectedSort] = useState(0)*/

    const choseSort = (obj: sortModel) => {
        /*onChangeSort(i)*/
        dispatch(setSelectedSort(obj))
        //setSortVisible(false)
        setSortVisible(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            //console.log(event.composedPath());
            if (sortRef.current) {
                let path = event.composedPath().includes(sortRef.current);
                if (!path) setSortVisible(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);
    // style={selectedSort.name.includes('DESC') ? `${transform: 'rotate(180deg)'}` : ''}
    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                     style={!selectedSort.sortProperty.includes('-') ? {transform: 'rotate(180deg)'} : {}}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                {/*<span onClick={() => setSortVisible(!sortVisible)}>{sortList[valueSort]}</span>*/}
                <span onClick={() => setSortVisible(!sortVisible)}>{selectedSort.name}</span>
            </div>
            {sortVisible &&
                <div onClick={(e) => e.stopPropagation()} className="sort__popup">
                    <ul>
                        {sortList.map((el, index) =>
                            <li key={el.name} onClick={() => choseSort(el)}
                                className={selectedSort.sortProperty === el.sortProperty ? 'active' : ''}>{el.name}</li>
                        )}
                    </ul>
                </div>
            }

        </div>
    );
});

export default Sort;