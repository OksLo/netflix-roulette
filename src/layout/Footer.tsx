import { type FC } from 'react';
import styles from './Footer.module.scss';

import Logo from 'src/components/logo/Logo.tsx';

const Footer: FC = () => {

    return (
        <footer className={styles['footer']}>
            <Logo />
        </footer>
    )
};

export default Footer;