import { type FC } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Header.module.scss';

import Logo from 'src/components/logo/Logo.tsx';

const Header: FC = () => {
    const navigate = useNavigate();
    const handleNavigateToAddForm = () => {
        navigate('/new');
    }

    return (
        <header className={styles['header']}>
            <Logo className={styles['header__logo']}/>
            <button onClick={handleNavigateToAddForm}>+ Add movie</button>
        </header>
    )
};

export default Header;