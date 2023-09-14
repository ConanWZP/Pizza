import React, {FC, useState} from 'react';
import '../../scss/app.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addItem, cartSelectorById} from "../../redux/reducers/cartSlice";
import cart from "../../pages/Cart";
import { NavLink } from 'react-router-dom';
import {IPizza} from "../../types/IPizza";

export interface PizzaBlockProps {
    price: number,
    imageUrl?: string,
    title: string,
    sizes: number[],
    types: number[],
    id: string
}

export interface typePizzaObject {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count: number
}

const PizzaBlock: FC<PizzaBlockProps> = ({id, price, imageUrl, title, sizes, types}) => {



    const [currentSize, setCurrentSize] = useState(0)
    const [currentType, setCurrentType] = useState(0)
    const typeNames = ['тонкое', 'традиционное']

    const dispatch = useAppDispatch()
    const addPizzaOnClick = () => {
        const pizzaObj = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[currentType],
            size: sizes[currentSize],
            count: 0
        } as typePizzaObject
        dispatch(addItem(pizzaObj))
    }

    //const cartItem = useAppSelector(state => state.cart.items.find(item => item.id === id))
    const cartItem = useAppSelector(cartSelectorById(id, sizes[currentSize], typeNames[currentType])) // export const cartSelectorById = (id: number) => (state: RootState) => state.cart.items.find(item => item.id === id)
    const addedPizza = cartItem ? cartItem.count : 0

    return (
        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
                <NavLink to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                </NavLink>
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type, index) =>

                            <li key={type} onClick={() => setCurrentType(type)}
                                className={currentType === index ? 'active' : ''}>{typeNames[type]}</li>
                        )}
                    </ul>
                    <ul>
                        {sizes.map((size, index) =>
                            <li key={size} onClick={() => setCurrentSize(index)}
                                className={currentSize === index ? 'active' : ''}>{size} см.</li>
                        )}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button className="button button--outline button--add" onClick={addPizzaOnClick}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedPizza > 0 && <i>{addedPizza}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;