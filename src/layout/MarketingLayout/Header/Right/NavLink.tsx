import styles from  './NavLink.module.css'
import { h } from 'preact';
import { useLocation } from '~/layout/routing';
import { useLayoutState } from '../../context';


export default function NavLink({ uri, text }: { uri: string, text: string }) {
    const location = useLocation()
    const [isSidebarActive] = useLayoutState().sidebarRight
    const isActive = location.pathname.startsWith(uri)
    return (
        <a class={`${styles.navlink} ${styles.hideOnMobile} ${isActive && !isSidebarActive && styles.active}`}
            href={uri + (isActive ? '?stack=reset' : '')}
        >
            {text}
        </a>
    )
}