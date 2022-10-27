import React, {FC} from 'react';
import Header from "../components/Header";
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import PizzaInfo from "../pages/PizzaInfo";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

const LayoutForOutlet: FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">

                    <Outlet />

            </div>

        </div>
    );
};

export default LayoutForOutlet;