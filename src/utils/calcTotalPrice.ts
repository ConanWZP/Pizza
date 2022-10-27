import {typePizzaObject} from "../components/PizzaBlock/PizzaBlock";


export const calcTotalPrice = (items: typePizzaObject[]) => {
    return items.reduce((previousValue, currentValue) => previousValue + (currentValue.price*currentValue.count), 0)
}