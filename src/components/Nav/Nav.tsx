import { useAuthContext } from "../../features/Auth/AuthContext";
import { BrandNavLink } from "./BrandNavLink";

import styles from './Nav.module.css';

export function Nav() {
  const { user } = useAuthContext();
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

        {!user && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink to="login">
                Login
              </BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="register">
                Register
              </BrandNavLink>
            </li>
          </>
        )}

        {user && (
          <li className={styles.pushRight}>
            Welcome, {user.firstName}!{' '}
            <a href="/">
              Logout
            </a>
          </li>
        )}

      </menu>
    </nav>
  )
}
