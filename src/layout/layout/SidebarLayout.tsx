import { ComponentChildren, h } from 'preact'
import { useEffect, useLayoutEffect, useRef } from 'preact/hooks'

import { ThemeCtx } from '~/App.context'
import {useMedia} from '~/lib/hooks'
import { ContentDiv } from '~/lib/router'
import styled from '~/lib/styled'

import BottomNav from '../components/BottomNav'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'
import { applyTheme, tenantDemoTheme } from '../theme'
import type { NavLinks } from '../types'

export default function SidebarLayout(p: {
	topLinks: NavLinks
	leftLinks: NavLinks
	rightLinks: NavLinks
	bottomLinks: NavLinks
	children: ComponentChildren
}) {
	const isWide = useMedia('(min-width: 700px)')
	const ref = useRef<any>(null)
	useEffect(listenForThemeToggle, [])
	return (
		<SidebarLayoutDiv ref={ref} class={ThemeCtx.get() === 'dark' ? 'dark' : ''}>
			{isWide && <Navbar sidebarLeft navLinks={p.topLinks} />}
			{isWide && <Sidebar navLinks={p.leftLinks} />}
			<SidebarRight navLinks={p.rightLinks} />
			{!isWide && <BottomNav navLinks={p.bottomLinks} />}
			<ContentDiv>
				{p.children}
			</ContentDiv>
		</SidebarLayoutDiv>
	)

	// Use passive listeners instead of ThemeCtx.use, to avoid unnecessary re-renders
	function listenForThemeToggle() {
		return ThemeCtx.subscribe(function _toggle() {
			const cl = ref.current.base.classList
			if (cl.contains('dark')) cl.remove('dark')
			else cl.add('dark')
		})
	}
}

const SidebarLayoutDiv = styled.div`
	:root
		--header-height: 48px
		--sidebarRight-width: 260px
		--sidebar-width-full: 300px
		--sidebar-width-mini: 94px
		--sidebar-width: var(--sidebar-width-full)
		--bottom-nav-height: 44px
		--body-height: calc( var(--vh) - var(--header-height) )
		--margin-bottom: 0px
		--margin-left: var(--sidebar-width)
		background: var(--white);
	@media (max-width: 1200px)
		:root
			--sidebar-width-full: 260px
	@media (max-width: 700px)
		:root
			--header-height: 0px
			--body-height: calc( var(--vh) - var(--header-height) - var(--bottom-nav-height) )
			--margin-bottom: var(--bottom-nav-height)
			--margin-left: 0px
	:root
		margin-top: var(--header-height)
		margin-bottom: var(--margin-bottom)
		margin-left: var(--margin-left)
	.miniSidebar :root
		--sidebar-width: var(--sidebar-width-mini)
`
