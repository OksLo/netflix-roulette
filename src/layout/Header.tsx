import { type FC } from 'react';
import styles from './Header.module.scss';

import Logo from 'src/components/logo/Logo.tsx';

const Header: FC = () => {

    return (
        <header className={styles['header']}>
            <Logo className={styles['header__logo']}/>
            <button>+ Add movie</button>
        </header>
    )
};

export default Header;