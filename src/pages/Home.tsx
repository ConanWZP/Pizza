import React, {FC, useCallback, useContext, useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {AppContext} from "../App";
import {useAppDispatch, useAppSelector} from "../hooks";
import {filterState, setCategoryId, setCurrentPage, setFilters, sortModel} from "../redux/reducers/filterSlice";
import axios from "axios";
import qs from 'qs'
import {NavLink, useNavigate} from 'react-router-dom'
import {getPizzasApi, setPizzas, takePizzas} from '../redux/reducers/pizzasSlice';

//import {add} from "../utils/math";

interface HomeProps {
    searchValue: string,
    setSearchValue: (e: string) => void,
}

const Home:FC = () => {
    const navigate = useNavigate()
    //const {searchValue} = useContext<any >(AppContext)

    //const [isLoading, setIsLoading] = useState(true)

    //add(5, 5)
    import('../utils/math').then(math => {
        console.log(math.add(5, 5))
    })

    const {categoryId, selectedSort, currentPage, searchValue} = useAppSelector(state => state.filter)
    const {pizzas, status, totalPages} = useAppSelector(state => state.pizzas)
    const dispatch = useAppDispatch()
    const onChangeCategory = useCallback((id: number) => {
        console.log('redux', id)
        /*setCategoryId(id)*/
        dispatch(setCategoryId(id)) //Импортируем из filterSlice action-creator setCategoryId()
        dispatch(setCurrentPage(1))
    }, [])
    /*const [categoryId, setCategoryId] = useState(0)*/
    // const [selectedSort, setSelectedSort] = useState({
    //     name: 'популярности(DESC)',
    //     sortProperty: 'rating'
    // })
    /*const [currentPage, setCurrentPage] = useState(1)*/
    //const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(4)

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const fetchPizzas = async () => {
        //setIsLoading(true)

        const sortBy = selectedSort.sortProperty.replace('-', '')
        const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}`: '';
        const search = searchValue ? `search=${searchValue}` : ''


        /*fetch(`https://63413b5520f1f9d7996e8f99.mockapi.io/items?limit=${limit}&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`)
            .then(res => {
                return res.json()
            })
            .then(newRes => {
                const data = newRes.items
                const pages = Math.ceil(newRes.count/limit)
                setTotalPages(pages)
                setPizzas(data)
                setIsLoading(false)
            })*/
        /*const getPizzas = await axios.get(`https://63413b5520f1f9d7996e8f99.mockapi.io/items?limit=${limit}&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`)
            .then(response => {
                const data = response.data.items
                const pages = Math.ceil(response.data.count/limit)
                setTotalPages(pages)
                setPizzas(data)
                setIsLoading(false)
            })*/

            //const getPizzas = await axios.get(`https://63413b5520f1f9d7996e8f99.mockapi.io/items?limit=${limit}&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`)
            //const data = getPizzas.data.items
            dispatch(takePizzas({
                limit,
                sortBy,
                order,
                category,
                search,
                currentPage
            }as getPizzasApi))
            //const pages = Math.ceil(getPizzas.data.count/limit)
            //const pages = 1
            //const data = 1
            //setTotalPages(pages)
            //dispatch(setPizzas(data))
            //setIsLoading(false)


    }

    useEffect(() => {

        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: selectedSort.sortProperty,
                categoryId,
                currentPage
            }, {addQueryPrefix: true})
            console.log(queryString)
            navigate(`${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, selectedSort, searchValue, currentPage])

    useEffect(() => {

        if (window.location.search) {

            const params = qs.parse(window.location.search.substring(1))
            console.log(params)
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({
                ...params,
                selectedSort: sort
            } as filterState, ))
            isSearch.current = true
        }
    }, [])


    useEffect(() => {

        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
            console.log('фетч',categoryId, selectedSort, currentPage)
        }
        isSearch.current = false

    }, [categoryId, selectedSort, searchValue, currentPage])






    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    /*const items = pizzas.filter((el) => {
        if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }else return false
    }).map(pizza =>
        <PizzaBlock key={pizza.id} price={pizza.price} photoUrl={pizza.imageUrl}
                    title={pizza.title}
                    sizes={pizza.sizes} types={pizza.types}/>
    )*/

    const items = pizzas.map(pizza =>
            <PizzaBlock key={pizza.id} price={pizza.price} imageUrl={pizza.imageUrl}
                        title={pizza.title} id={pizza.id}
                        sizes={pizza.sizes} types={pizza.types}/>
    )

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                <Sort selectedSort={selectedSort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                ? <div className='content__error-info'>
                    <h2>Произошла ошибка <i>😕</i></h2>
                    <p>Не удалось загрузить товары</p>
                </div>
                : <div className="content__items">
                    {/*{pizzas.map(pizza =>
                            <PizzaBlock key={pizza.id} price={pizza.price} photoUrl={pizza.imageUrl} title={pizza.title}
                                        sizes={pizza.sizes} types={pizza.types}/>
                        )}*/}

                    {status === 'loading' ?
                        skeleton
                        : items
                    }
                </div>
            }

            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Home;