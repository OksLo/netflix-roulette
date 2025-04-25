import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

import Header from "src/layout/Header.tsx";
import Footer from "src/layout/Footer.tsx";

const Layout: FC = () => {

    return (
        <>
            <Header />
            <main className={styles['layout__content']}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
};

export default Layout;