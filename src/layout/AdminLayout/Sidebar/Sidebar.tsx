import styles from  './Sidebar.module.css'
import { h } from 'preact';
import lazy from '~/layout/lazy';

const Nav = lazy(() => import('./Nav'))

export default function Sidebar() {
    return <div class={styles.sidebar}>
        <Nav />
    </div>
}