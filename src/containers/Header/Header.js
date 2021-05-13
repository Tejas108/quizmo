import React from 'react';
import styles from './head.module.scss';

const Header = ({categoryTitle}) => {

    return(
        <header className={styles.header} role="banner">
            <div>
                <h1 h1 className={styles.logo}>QUIZMO</h1>
                <div className={styles.titleWrap}>
                    <h2>{categoryTitle}</h2>
                </div>
            </div>
        </header>
        
    )
}

export default Header;