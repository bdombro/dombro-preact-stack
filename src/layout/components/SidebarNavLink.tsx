import { FunctionalComponent, h } from 'preact'

import * as i from '~/lib/icons'
import {LocationCtx} from '~/lib/router'
import styled from '~/lib/styled'

interface NavLinkProps { path: string, title: string, Icon?: FunctionalComponent }

export default function NavLink(p: NavLinkProps) {
	const [{pathname}] = LocationCtx.use()
	const isActive = p.path === '/' ? pathname === '/' : pathname.startsWith(p.path)
	const Icon = p.Icon ?? i.Info
	return (
		<NavLinkA
			aria-label={p.title}
			href={p.path + (isActive && 'stack' in p ? '#stack-reset' : '')}
			data-active={isActive}
		>
			<div><Icon /></div>
			<NavLinkText class='navlinkText'>{p.title}</NavLinkText>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root
		padding: 14px 0 10px 18px
		color: var(--black)
		display: flex
		flex-direction: row
		border-radius: 8px
		border-left: 6px solid rgba(0,0,0,0)
		margin: 10px
		overflow-x: hidden
	:root:hover
		background: var(--sidebar-background-hover)
		text-decoration: none
	:root[data-active="true"],
	:root[data-active="true"]:hover,
	:root:active
		border-left: 6px solid var(--primary)
		background: var(--sidebar-background-active)
		color: var(--nav-text-active)
	:root:active
		transform: translateY(2px)
	.dark :root[data-active="true"],
	.dark :root[data-active="true"]:hover,
	.dark :root:active
		border-left: 6px solid var(--gray9)
`
const NavLinkText = styled.div`
	:root
		padding: 3px 14px 3px 20px
`