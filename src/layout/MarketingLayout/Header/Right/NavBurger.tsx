import { h } from 'preact'

import { useLayoutState } from '../../context'
import styles from './NavBurger.module.css'
import linkStyles from './NavLink.module.css'

export default function NavBurger() {
  const [isActive, setIsActive] = useLayoutState().sidebarRight
  return (
    <a class={`${linkStyles.navlink} ${styles.hamburger} ${isActive ? linkStyles.active : ''}`}
      href={'#navburger-click'}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? 'X' : 'Ξ'}
    </a>
  )
}