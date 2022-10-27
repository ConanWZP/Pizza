import React, {FC} from 'react';
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: FC = () => {
    return (
        <div className={styles.mainBlock}>
            <h1 >
                <span>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p className={styles.description}>Данная страница не найдена код ошибки 404</p>
        </div>

    );
};

export default NotFoundBlock;