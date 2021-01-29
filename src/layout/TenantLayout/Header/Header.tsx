import { h } from 'preact'

import lazy from '~/layout/lazy'
import styles from '~/layout/MarketingLayout/Header/Header.module.css'

const Left = lazy(() => import('~/layout/AdminLayout/Header/Left/Left'))
const Right = lazy(() => import('./Right/Right'))

export default function Header() {
  return <div class={styles.header}>
    <Left />
    <Right />
  </div>
}