import { type FC } from 'react';
import appLogo from 'src/assets/logo.svg';
import styles from './Logo.module.scss';

interface ILogoProps {
    className?: string;
}
const Logo: FC<ILogoProps> = ({className = ''}) => {

    return (
        <img src={appLogo} alt="logo" className={`${styles['logo']} ${className}`} />
    )
};

export default Logo;