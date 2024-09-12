import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';

import styles from './Nav.module.css';

interface Props extends NavLinkProps {
  className?: string;
}

export function BrandNavLink({className = '', ...props}: Props) {
  return (
    <NavLink
      className={({ isActive }) => clsx(className, { [styles.active]: isActive })}
      {...props}
    />
  );
}


// const o1 = { prop: 'val', alt: 'Paul' };
// const o2 = { alt: 'prop', ...o1 };
