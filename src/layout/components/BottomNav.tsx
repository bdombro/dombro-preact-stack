import { FunctionalComponent, h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { SidebarRightCtx } from '~/App.context'
import * as i from '~/lib/icons'
import {LocationCtx} from '~/lib/router'
import styled from '~/lib/styled'

import type { NavLinkProps, NavLinks } from '../types'


const useSidebarRight = SidebarRightCtx.use


export default function BottomNav({ navLinks }: { navLinks: NavLinks }) {
	return <Nav>
		{navLinks
			.filter(nl => nl.hasAccess ? nl.hasAccess() : true)
			.map(nl => <NavLink {...nl} />)}
		<NavBurger />
	</Nav>
}
const Nav = styled.div`
	:root
		z-index: 1
		will-change: scroll-position
		position: fixed
		bottom: 0
		width: 100%
		background: var(--nav-background)
		display: flex
		flex-direction: row
		height: var(--bottom-nav-height)
		overflow-y: hidden
`


function NavLink(p: NavLinkProps) {
	const [_location] = LocationCtx.use()
	const [isSidebarActive] = useSidebarRight()
	const isActive = _location.pathname.startsWith(p.path)
	const Icon = p.Icon ?? i.Info
	return (
		<NavLinkA
			aria-label={p.title}
			data-active={isActive && !isSidebarActive}
			href={p.path + (isActive && 'stack' in p ? '#stack-reset' : '')}>
			<div><Icon /></div>
		</NavLinkA>
	)
}
const NavLinkA = styled.a`
	:root
		flex-grow: 1
		text-align: center
		padding: 8px
		border-right: 1px solid var(--nav-background)
		border-top: 1px solid var(--nav-background)
		text-decoration: none !important
	}
	:root:hover
		background: var(--nav-background-active)
		border-right: 1px solid var(--nav-background-active)
		border-top: 1px solid var(--nav-background-active)
	:root[data-active="true"],
	:root[data-active="true"]:hover
		color: var(--nav-text-active)
		background: var(--nav-background-active)
		border-right: 1px solid var(--nav-background-active)
		border-top: 1px solid var(--nav-background-active)
	:root:last-of-type
		border-right: none
`


/**
 * This is a little more complex than the Marketing Navburger, b/c it can have a diff
 * state than sidebarRight b/c the sidebar can also be activated in the 
 * Header->Right->Navburger. The added complexity allows NavBurger to handle this
 * gracefully.
 */
function NavBurger() {
	const [isActive, setIsActive] = useState(false)
	const [isSidebarActive, setIsSidebarActive] = useSidebarRight()
	const onClick = useCallback(_onClick, [])
	useEffect(() => {if (!isSidebarActive) setIsActive(false)}, [isSidebarActive])
	return (
		<NavLinkA 
			aria-label="Open Right menu"
			data-active={isActive}
			href="#sidebar-right-toggle"
			onClick={onClick}
		>
			<div>{isActive
				? <i.Close width={22}  />
				: <i.Menu width={22} />
			}</div>
		</NavLinkA>
	)

	function _onClick(e: any) {
		e.preventDefault()
		setIsActive(isActive => {
			setIsSidebarActive(!isActive)
			return !isActive
		})
	}
}