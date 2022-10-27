import React, {FC, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import { PizzaBlockProps } from '../components/PizzaBlock/PizzaBlock';

const PizzaInfo: FC = () => {

    const {pizzaId} = useParams()
    const [pizzaById, setPizzaById] = useState<PizzaBlockProps>()
    console.log(pizzaById)
    const getPizzaById = async () => {
        try {
            const getPizzas = await axios.get(`https://63413b5520f1f9d7996e8f99.mockapi.io/items/${pizzaId}`)
            setPizzaById(getPizzas.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect( () => {
        getPizzaById()

    }, [pizzaId])
    console.log(pizzaById)


    if (!pizzaById) {
        return <div>Загрузка</div>
    }

    return (
        <div className={'container'}>
            <h2>{pizzaById.title}</h2>
            <img src={pizzaById.imageUrl} />
            <p>Описание пиццыыыыыыыыыыыыыыыыы</p>
            <span>{pizzaById.price} ₽</span>
            <Link to={'/'}>
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>

        </div>
    );
};

export default PizzaInfo;