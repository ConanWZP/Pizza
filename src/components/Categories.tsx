import React, {FC} from 'react';
import './../scss/app.scss'

import { useWhyDidYouUpdate } from 'ahooks';


interface CategoriesProps {
    value: number,
    onClickCategory: (idx: number) => void,
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: FC<CategoriesProps> = React.memo(({value, onClickCategory}) => {

    /*const [activeIndex, setActiveIndex] = useState(0)*/
    useWhyDidYouUpdate('Categories', {value, onClickCategory})


    return (
        <div className="categories">
            <ul>
                {/*<li className="active">Все</li>*/}
                {/*<li>Мясные</li>
                <li>Вегетарианская</li>
                <li>Гриль</li>*/}
                {categories.map((el, index) =>
                    <li key={el} onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>{el}</li>
                )}
            </ul>
        </div>
    );
});

export default Categories;