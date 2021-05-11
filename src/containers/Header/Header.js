import React from 'react';
import styles from './head.module.scss';

const Header = () => {

    return(
        <header className={styles.header} role="banner">
            <h1 className={styles.logo}>QUIZMO</h1>
        </header>
        
    )
}

export default Header;