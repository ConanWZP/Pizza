import React, {useEffect, useState} from 'react';
import './scss/app.scss';
import Header from "./components/Header";
import Categories from './components/Categories';
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";
import Home from "./pages/Home";
//import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
//import Cart from "./pages/Cart";
import axios from "axios";
//import PizzaInfo from "./pages/PizzaInfo";
import LayoutForOutlet from "./layout/LayoutForOutlet";
/*import pizzas from './assets/pizzas.json'*/
import Loadable from 'react-loadable';
import Loader from "./components/Loader";


const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
    loading: Loader,
});

//const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))
const PizzaInfo = React.lazy(() => import(/* webpackChunkName: "PizzaInfo" */ './pages/PizzaInfo'))



export const AppContext = React.createContext('')

const App = () => {


    return (
        /* <div className="wrapper">*/
            /*<Header />*/
            /*<div className="content">
                <div className="container">*/

                    <Routes>
                        <Route path={'/'} element={<LayoutForOutlet/>}>
                            <Route path={''} element={<Home/>}/>
                            <Route path={'pizza/:pizzaId'} element={<React.Suspense fallback={<div>Загрузка информации....</div>}>
                                <PizzaInfo />
                            </React.Suspense>}/>
                            <Route path={'cart'} element={
                                <React.Suspense fallback={<div>Загрузка корзины....</div>}>
                                    <Cart />
                                </React.Suspense>
                            }/>
                            <Route path={'*'} element={<React.Suspense fallback={<div>Загрузка....</div>}>
                                <NotFound />
                            </React.Suspense>}/>
                        </Route>
                    </Routes>
        /*      </div>
             </div>*/

        /*</div>*/
    )
};

export default App;
