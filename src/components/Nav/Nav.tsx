import { BrandNavLink } from "./BrandNavLink";

import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles.topNav}>
      <menu>
        <li>
          <BrandNavLink to="/">
            Home
          </BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="counter">
            Counter
          </BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="films">
            Films
          </BrandNavLink>
        </li>
      </menu>
    </nav>
  )
}
