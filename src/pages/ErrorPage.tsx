import { type FC } from 'react';
import { Link, useRouteError } from "react-router-dom";
import styles from './ErrorPage.module.scss';

const ErrorPage: FC = () => {
    const error = useRouteError();

    return (
        <div className={styles['error-page']}>
            <div className={styles['error-page__status']}>{ error.status }</div>
            <div className={styles['error-page__message']}>{ error.statusText || error.message  }</div>
            <Link to={'/'} className={styles['error-page__link']}>Go to Homepage</Link>
        </div>
    )
};

export default ErrorPage;