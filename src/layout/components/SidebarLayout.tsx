import { ComponentChildren, h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import { ThemeCtx } from '~/App.context'
import styled from '~/lib/styled'

export default function SidebarLayout({children}: {children: ComponentChildren}) {
	const ref = useRef<any>(null)
	useEffect(listenForThemeToggle, [])
	return (
		<SidebarLayoutDiv ref={ref} class={ThemeCtx.get() === 'dark' ? 'dark' : ''}>
			{children}
		</SidebarLayoutDiv>
	)

	// Use passive listeners instead of ThemeCtx.use, to avoid unnecessary re-renders
	function listenForThemeToggle() {
		return ThemeCtx.subscribe(function toggle() {
			const cl = ref.current.base.classList
			if (cl.contains('dark')) cl.remove('dark')
			else cl.add('dark')
		})
	}
}

const SidebarLayoutDiv = styled.div`
	:root {
		--header-height: 48px;
		--sidebarRight-width: 200px;
		
		--sidebar-width-full: 200px;
		--sidebar-width-mini: 52px;
		--sidebar-width: var(--sidebar-width-full);

		--bottom-nav-height: 44px;

		--white-height: calc( 100vh - var(--header-height) );
		--margin-bottom: 0;
		--margin-left: var(--sidebar-width);
	}

	@media (max-width: 600px) {
		:root {
			--white-height: calc( 100vh - var(--header-height) - var(--bottom-nav-height) );
			--margin-bottom: var(--bottom-nav-height);
			--margin-left: 0;
		}
	}

	:root {
		margin-top: var(--header-height);
		margin-bottom: var(--margin-bottom);
		margin-left: var(--margin-left);
	}

	.miniSidebar :root {
		--sidebar-width: var(--sidebar-width-mini);
	}
`
